import type { Application } from "express";
import { aiRoutes } from "./ai.routes.js";
import { embeddingRoutes } from "./embedding.routes.js";
import { searchRoutes } from "./search.routes.js";

export function route(app: Application): void {
  aiRoutes(app);
  embeddingRoutes(app);
  searchRoutes(app);
}
