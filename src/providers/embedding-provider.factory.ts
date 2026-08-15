import { env } from "../config/env.js";
import type { EmbeddingProvider } from "./embedding-provider.interface.js";
import { MockEmbeddingProvider } from "./mock-embedding.provider.js";
import { OpenAIEmbeddingProvider } from "./openai-embedding.provider.js";

export const createEmbeddingProvider = (): EmbeddingProvider => {
  switch (env.aiProvider) {
    case "openai":
      return new OpenAIEmbeddingProvider();

    case "mock":
      return new MockEmbeddingProvider();

    default:
      throw new Error(`Unsupported embedding provider: ${env.aiProvider}`);
  }
};
