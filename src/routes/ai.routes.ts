import { type Application } from "express";
import { chat } from "../controller/ai.controller.js";

const API_PREFIX = "/api/v1/ai";

export function aiRoutes(app: Application): void {
  app.use(`${API_PREFIX}/chat`, chat);
}
