import type { AIProviderResponse } from "../tools/tool-call.types.js";
import type { AIProvider } from "./ai-provider.interface.js";

export class MockAIProvider implements AIProvider {
  async generateText(message: string): Promise<string> {
    return `Mock AI response for: ${message}`;
  }

  async generateJSON(message: string): Promise<unknown> {
    return {
      category: "payment",
      priority: "high",
      needsHumanReview: true,
    };
  }

  async *streamText(message: string): AsyncIterable<string> {
    const chunks = [
      "Mock ",
      "streaming ",
      "AI ",
      "response ",
      `for: ${message}`,
    ];

    for (const chunk of chunks) {
      await new Promise((resolve) => setTimeout(resolve, 300));

      yield chunk;
    }
  }

  async requestTool(message: string): Promise<AIProviderResponse> {
    const match = message.match(/order\s*#?(\d+)/i);

    if (!match?.[1]) {
      return {
        type: "text",
        text: "Please provide an order ID.",
      };
    }

    return {
      type: "tool_call",
      callId: "mock-call-1",
      contextId: "mock-context-1",
      name: "get_order",
      arguments: {
        orderId: match[1],
      },
    };
  }

  async completeToolCall(
    contextId: string,
    callId: string,
    result: unknown,
  ): Promise<string> {
    const order = result as {
      id: string;
      status: string;
      estimatedDelivery: string;
    } | null;

    if (!order) {
      return "I could not find that order.";
    }

    return `Order #${order.id} is currently ${order.status} and is expected to arrive on ${order.estimatedDelivery}.`;
  }
}
