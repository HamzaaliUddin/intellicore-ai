import OpenAI from "openai";
import { env } from "../config/env.js";
import type { AIProvider } from "./ai-provider.interface.js";

export class OpenAIProvider implements AIProvider {
  private readonly client: OpenAI;

  constructor() {
    this.client = new OpenAI({
      apiKey: env.openAIAPIKey,
    });
  }

  async generateText(message: string): Promise<string> {
    const response = await this.client.responses.create({
      model: env.openAIModel,
      input: message,
    });

    return response.output_text;
  }
}