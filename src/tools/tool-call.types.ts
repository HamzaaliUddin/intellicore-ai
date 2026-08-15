export type AIToolCall = {
  type: "tool_call";
  callId: string;
  contextId: string;
  name: string;
  arguments: unknown;
};

export type AITextResponse = {
  type: "text";
  text: string;
};

export type AIProviderResponse =
  | AIToolCall
  | AITextResponse;