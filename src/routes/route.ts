import type { Application } from "express";
import { aiRoutes } from "./ai.routes.js";

export function route(app: Application): void {
  aiRoutes(app);
}
