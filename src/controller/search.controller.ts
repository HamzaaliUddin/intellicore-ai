import type { NextFunction, Request, Response } from "express";

import { createEmbeddingProvider } from "../providers/embedding-provider.factory.js";
import { SemanticSearchService } from "../services/semantic-search.service.js";

import type { AddDocumentInput, SearchInput } from "../schemas/ai.schema.js";

const semanticSearchService = new SemanticSearchService(
  createEmbeddingProvider(),
);

export const addDocument = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id, content } = req.body as AddDocumentInput;

    await semanticSearchService.addDocument(id, content);

    res.status(201).json({
      success: true,
      message: "Document added successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const searchDocuments = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { query } = req.body as SearchInput;

    const result = await semanticSearchService.search(query);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
