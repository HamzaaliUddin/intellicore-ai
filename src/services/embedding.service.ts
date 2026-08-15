import type { EmbeddingProvider } from "../providers/embedding-provider.interface.js";

export class EmbeddingService {
  constructor(private readonly provider: EmbeddingProvider) {}

  async createEmbedding(text: string): Promise<number[]> {
    return this.provider.createEmbedding(text);
  }
}
