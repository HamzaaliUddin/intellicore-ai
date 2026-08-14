import type { NextFunction, Request, Response } from "express";
import { createAIProvider } from "../providers/ai-provider.factory.js";
import { type ChatInput } from "../schemas/ai.schema.js";
import { AIService } from "../services/ai.service.js";

const provider = createAIProvider();

const aiService = new AIService(provider);

export const chat = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { message } = req.body as ChatInput;

    const answer = await aiService.generateResponse(message);

    res.status(200).json({
      success: true,
      answer,
    });
  } catch (error) {
    next(error);
  }
};

export const analyzeSupport = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { message } = req.body as ChatInput;

    const analysis = await aiService.analyzeSupportMessage(message);

    res.status(200).json({
      success: true,
      data: analysis,
    });
  } catch (error) {
    next(error);
  }
};
