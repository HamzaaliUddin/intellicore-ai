import { type Application } from "express";
import {
  analyzeSupport,
  chat,
  streamChat,
} from "../controller/ai.controller.js";
import { validateBody } from "../middlewares/validate.middleware.js";
import { chatSchema } from "../schemas/ai.schema.js";

const API_PREFIX = "/api/v1/ai";

export function aiRoutes(app: Application): void {
  app.post(`${API_PREFIX}/chat`, validateBody(chatSchema), chat);
  app.post(`${API_PREFIX}/analyze`, validateBody(chatSchema), analyzeSupport);
  app.post(`${API_PREFIX}/chat/stream`, validateBody(chatSchema), streamChat);
}
