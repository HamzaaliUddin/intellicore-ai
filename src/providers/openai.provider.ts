import OpenAI from "openai";
import { env } from "../config/env.js";
import { AIProviderError } from "../errors/ai-provider.error.js";
import type { AIProvider } from "./ai-provider.interface.js";

export class OpenAIProvider implements AIProvider {
  private readonly client: OpenAI;

  constructor() {
    this.client = new OpenAI({
      apiKey: env.openAIAPIKey,
      timeout: 30_000,
      maxRetries: 2,
    });
  }

  async generateText(message: string): Promise<string> {
    const startedAt = Date.now();

    try {
      const response = await this.client.responses.create({
        model: env.openAIModel,
        input: message,
      });

      const durationMs = Date.now() - startedAt;

      console.log({
        provider: "openai",
        model: env.openAIModel,
        inputTokens: response.usage?.input_tokens,
        outputTokens: response.usage?.output_tokens,
        totalTokens: response.usage?.total_tokens,
        durationMs,
        status: "success",
      });

      return response.output_text;
    } catch (error) {
      const durationMs = Date.now() - startedAt;

      console.error({
        provider: "openai",
        model: env.openAIModel,
        durationMs,
        status: "failed",
      });

      this.handleError(error);
    }
  }

  async generateJSON(message: string): Promise<unknown> {
    const startedAt = Date.now();

    try {
      const response = await this.client.responses.create({
        model: env.openAIModel,
        instructions: `
        Return only valid JSON.

        Use this structure:

        {
          "category": "payment | shipping | refund | account | other",
          "priority": "low | medium | high",
          "needsHumanReview": true
        }
      `,
        input: message,
      });

      const durationMs = Date.now() - startedAt;

      console.log({
        provider: "openai",
        model: env.openAIModel,
        inputTokens: response.usage?.input_tokens,
        outputTokens: response.usage?.output_tokens,
        totalTokens: response.usage?.total_tokens,
        durationMs,
        status: "success",
      });

      return JSON.parse(response.output_text);
    } catch (error) {
      const durationMs = Date.now() - startedAt;

      console.error({
        provider: "openai",
        model: env.openAIModel,
        durationMs,
        status: "failed",
      });

      this.handleError(error);
    }
  }
  private handleError(error: unknown): never {
    if (error instanceof OpenAI.AuthenticationError) {
      throw new AIProviderError(
        "AUTHENTICATION",
        "AI provider authentication failed",
      );
    }

    if (error instanceof OpenAI.RateLimitError) {
      throw new AIProviderError(
        "RATE_LIMIT",
        "AI provider rate limit exceeded",
      );
    }

    if (error instanceof OpenAI.APIConnectionTimeoutError) {
      throw new AIProviderError("TIMEOUT", "AI provider request timed out");
    }

    if (error instanceof OpenAI.InternalServerError) {
      throw new AIProviderError(
        "PROVIDER_UNAVAILABLE",
        "AI provider is temporarily unavailable",
      );
    }

    if (error instanceof OpenAI.BadRequestError) {
      throw new AIProviderError(
        "INVALID_REQUEST",
        "Invalid AI provider request",
      );
    }

    throw new AIProviderError("UNKNOWN", "Unexpected AI provider error");
  }
}
