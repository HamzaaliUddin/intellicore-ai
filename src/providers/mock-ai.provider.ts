import type { AIProvider } from "./ai-provider.interface.js";

export class MockAIProvider implements AIProvider {
  async generateText(message: string): Promise<string> {
    return `Mock AI response for: ${message}`;
  }
}