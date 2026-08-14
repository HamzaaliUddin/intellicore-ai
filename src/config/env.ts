import "dotenv/config";

const port = Number(process.env.PORT || 3000);

const openAIAPIKey = process.env.OPENAI_API_KEY;

if (!openAIAPIKey) {
  throw new Error("OPENAI_API_KEY is not configured");
}

export const env = {
  port,
  openAIAPIKey,
};