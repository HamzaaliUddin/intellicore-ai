export type AIProviderErrorCode =
  | "RATE_LIMIT"
  | "AUTHENTICATION"
  | "TIMEOUT"
  | "PROVIDER_UNAVAILABLE"
  | "INVALID_REQUEST"
  | "UNKNOWN";

export class AIProviderError extends Error {
  constructor(
    public readonly code: AIProviderErrorCode,
    message: string
  ) {
    super(message);

    this.name = "AIProviderError";
  }
}