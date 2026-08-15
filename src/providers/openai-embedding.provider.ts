import OpenAI from "openai";
import { env } from "../config/env.js";
import type { EmbeddingProvider } from "./embedding-provider.interface.js";

export class OpenAIEmbeddingProvider implements EmbeddingProvider {
  private readonly client: OpenAI;

  constructor() {
    this.client = new OpenAI({
      apiKey: env.openAIAPIKey,
    });
  }

  async createEmbedding(text: string): Promise<number[]> {
    const response = await this.client.embeddings.create({
      model: env.openAIEmbeddingModel,
      input: text,
      encoding_format: "float",
    });

    return response.data[0]?.embedding ?? [];
  }
}
