import express from "express";
import { env } from "./config/env.js";
import { route } from "./routes/route.js";

export const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "IntelliCore AI API is healthy",
  });
});

route(app);

app.listen(env.port, () => {
  console.log(`Server running on http://localhost:${env.port}`);
});
