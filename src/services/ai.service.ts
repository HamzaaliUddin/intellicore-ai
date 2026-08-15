import { buildSupportAnalysisPrompt } from "../prompt/support-analysis.prompt.js";
import { buildSupportPrompt } from "../prompt/support.prompt.js";
import type { AIProvider } from "../providers/ai-provider.interface.js";
import {
  supportAnalysisSchema,
  type SupportAnalysis,
} from "../schemas/ai.schema.js";

export class AIService {
  constructor(private readonly provider: AIProvider) {}

  async generateResponse(message: string): Promise<string> {
    const prompt = buildSupportPrompt(message);

    return this.provider.generateText(prompt);
  }

  async analyzeSupportMessage(message: string): Promise<SupportAnalysis> {
    const prompt = buildSupportAnalysisPrompt(message);

    const aiResponse = await this.provider.generateJSON(prompt);

    const result = supportAnalysisSchema.safeParse(aiResponse);

    if (!result.success) {
      throw new Error("AI returned invalid structured data");
    }

    return result.data;
  }

  streamResponse(message: string): AsyncIterable<string> {
    const prompt = buildSupportPrompt(message);

    return this.provider.streamText(prompt);
  }
}
