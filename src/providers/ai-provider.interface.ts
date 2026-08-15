import type { AIProviderResponse } from "../tools/tool-call.types.js";

export interface AIProvider {
  generateText(message: string): Promise<string>;

  generateJSON(message: string): Promise<unknown>;

  streamText(message: string): AsyncIterable<string>;

  requestTool(message: string): Promise<AIProviderResponse>;

  completeToolCall(
    contextId: string,
    callId: string,
    result: unknown,
  ): Promise<string>;
}
