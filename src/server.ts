import express from "express";
import { env } from "./config/env.js";
import { errorHandler } from "./middlewares/errors.middleware.js";
import { route } from "./routes/route.js";
import { requestLogger } from "./middlewares/request-logger.middleware.js";

export const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "IntelliCore AI API is healthy",
  });
});

app.use(requestLogger);

route(app);
app.use(errorHandler);

app.listen(env.port, () => {
  console.log(`Server running on http://localhost:${env.port}`);
});
