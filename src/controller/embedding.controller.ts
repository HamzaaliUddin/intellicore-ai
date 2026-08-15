import type { NextFunction, Request, Response } from "express";

import { createEmbeddingProvider } from "../providers/embedding-provider.factory.js";
import type { EmbeddingInput } from "../schemas/ai.schema.js";
import { EmbeddingService } from "../services/embedding.service.js";

const embeddingService = new EmbeddingService(createEmbeddingProvider());

export const createEmbedding = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { text } = req.body as EmbeddingInput;

    const embedding = await embeddingService.createEmbedding(text);

    res.status(200).json({
      success: true,
      data: {
        dimensions: embedding.length,
        embedding,
      },
    });
  } catch (error) {
    next(error);
  }
};
