import type { Request, Response } from "express";
import { AIService } from "../services/ai.service.js";
import { OpenAIProvider } from "../providers/openai.provider.js";

const aiService = new AIService(new OpenAIProvider());

export const chat = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== "string") {
      res.status(400).json({
        success: false,
        message: "Message is required",
      });
      return;
    }

    const answer = await aiService.generateResponse(message);

    res.status(200).json({
      success: true,
      answer,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to generate AI response",
    });
  }
};