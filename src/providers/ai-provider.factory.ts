import { env } from "../config/env.js";
import type { AIProvider } from "./ai-provider.interface.js";
import { MockAIProvider } from "./mock-ai.provider.js";
import { OpenAIProvider } from "./openai.provider.js";

export const createAIProvider = (): AIProvider => {
  switch (env.aiProvider) {
    case "openai":
      return new OpenAIProvider();

    case "mock":
      return new MockAIProvider();

    default:
      throw new Error(
        `Unsupported AI provider: ${env.aiProvider}`
      );
  }
};