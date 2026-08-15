import { type Application } from "express";
import { createEmbedding } from "../controller/embedding.controller.js";
import { validateBody } from "../middlewares/validate.middleware.js";
import { embeddingSchema } from "../schemas/ai.schema.js";

const API_PREFIX = "/api/v1";

export function embeddingRoutes(app: Application): void {
  app.post(
    `${API_PREFIX}/embeddings`,
    validateBody(embeddingSchema),
    createEmbedding,
  );
}
