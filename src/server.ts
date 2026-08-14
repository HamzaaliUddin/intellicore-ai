import express from "express";
import { env } from "./config/env.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "IntelliCore AI API is running",
  });
});

app.listen(env.port, () => {
  console.log(`Server running on http://localhost:${env.port}`);
});