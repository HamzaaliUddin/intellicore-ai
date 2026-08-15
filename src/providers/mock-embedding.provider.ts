import type { EmbeddingProvider } from "./embedding-provider.interface.js";

export class MockEmbeddingProvider implements EmbeddingProvider {
  async createEmbedding(text: string): Promise<number[]> {
    const length = text.length;
    const words = text.trim().split(/\s+/).length;

    const characterSum = Array.from(text).reduce(
      (sum, character) => sum + character.charCodeAt(0),
      0,
    );

    return [length / 100, words / 10, characterSum / 10000];
  }
}
