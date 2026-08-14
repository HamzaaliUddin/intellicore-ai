import type { AIProvider } from "../providers/ai-provider.interface.js";
import {
  supportAnalysisSchema,
  type SupportAnalysis,
} from "../schemas/ai.schema.js";

export class AIService {
  constructor(
    private readonly provider: AIProvider
  ) {}

  async generateResponse(
    message: string
  ): Promise<string> {
    return this.provider.generateText(message);
  }

  async analyzeSupportMessage(
    message: string
  ): Promise<SupportAnalysis> {
    const aiResponse =
      await this.provider.generateJSON(message);

    const result =
      supportAnalysisSchema.safeParse(aiResponse);

    if (!result.success) {
      throw new Error(
        "AI returned invalid structured data"
      );
    }

    return result.data;
  }
}