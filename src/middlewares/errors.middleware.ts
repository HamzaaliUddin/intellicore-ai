import type {
  NextFunction,
  Request,
  Response,
} from "express";

import { AIProviderError } from "../errors/ai-provider.error.js";

export const errorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(error);

  if (error instanceof AIProviderError) {
    switch (error.code) {
      case "RATE_LIMIT":
        res.status(429).json({
          success: false,
          message: "AI service is currently busy",
        });
        return;

      case "AUTHENTICATION":
        res.status(500).json({
          success: false,
          message: "AI service configuration error",
        });
        return;

      case "TIMEOUT":
        res.status(504).json({
          success: false,
          message: "AI provider request timed out",
        });
        return;

      case "PROVIDER_UNAVAILABLE":
        res.status(503).json({
          success: false,
          message: "AI provider is temporarily unavailable",
        });
        return;

      case "INVALID_REQUEST":
        res.status(500).json({
          success: false,
          message: "Invalid AI provider request",
        });
        return;

      default:
        res.status(500).json({
          success: false,
          message: "AI service failed",
        });
        return;
    }
  }

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};