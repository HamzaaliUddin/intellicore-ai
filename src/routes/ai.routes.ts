import { type Application } from "express";
import { chat } from "../controller/ai.controller.js";
import { validateBody } from "../middlewares/validate.middleware.js";
import { chatSchema } from "../schemas/ai.schema.js";

const API_PREFIX = "/api/v1/ai";

export function aiRoutes(app: Application): void {
  app.use(`${API_PREFIX}/chat`, validateBody(chatSchema), chat);
}
