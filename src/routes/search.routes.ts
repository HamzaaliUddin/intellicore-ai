import { type Application } from "express";
import {
  addDocument,
  searchDocuments,
} from "../controller/search.controller.js";
import { validateBody } from "../middlewares/validate.middleware.js";
import { addDocumentSchema, searchSchema } from "../schemas/ai.schema.js";

const API_PREFIX = "/api/v1";

export function searchRoutes(app: Application): void {
  app.post(
    `${API_PREFIX}/documents`,
    validateBody(addDocumentSchema),
    addDocument,
  );
  app.post(`${API_PREFIX}/search`, validateBody(searchSchema), searchDocuments);
}
