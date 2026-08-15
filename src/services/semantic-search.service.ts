import type { EmbeddingProvider } from "../providers/embedding-provider.interface.js";
import { cosineSimilarity } from "../utils/cosine-similarity.js";

type Document = {
  id: string;
  content: string;
  embedding: number[];
};

export class SemanticSearchService {
  private documents: Document[] = [];

  constructor(private readonly embeddingProvider: EmbeddingProvider) {}

  async addDocument(id: string, content: string): Promise<void> {
    const embedding = await this.embeddingProvider.createEmbedding(content);

    this.documents.push({
      id,
      content,
      embedding,
    });
  }

  async search(query: string): Promise<Document | null> {
    if (this.documents.length === 0) {
      return null;
    }

    const queryEmbedding = await this.embeddingProvider.createEmbedding(query);

    let bestDocument: Document | null = null;
    let bestScore = -1;

    for (const document of this.documents) {
      const score = cosineSimilarity(queryEmbedding, document.embedding);

      if (score > bestScore) {
        bestScore = score;
        bestDocument = document;
      }
    }

    return bestDocument;
  }
}
