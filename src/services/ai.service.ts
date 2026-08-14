import type { AIProvider } from "../providers/ai-provider.interface.js";

export class AIService {
  constructor(private readonly provider: AIProvider) {}

  async generateResponse(message: string): Promise<string> {
    return this.provider.generateText(message);
  }
}