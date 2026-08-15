import "dotenv/config";

const port = Number(process.env.PORT || 3000);

const openAIAPIKey = process.env.OPENAI_API_KEY;
const openAIModel = process.env.OPENAI_MODEL || "gpt-5.6";
const aiProvider = process.env.AI_PROVIDER || "mock";
const openAIEmbeddingModel =
  process.env.OPENAI_EMBEDDING_MODEL || "text-embedding-3-small";

if (aiProvider === "openai" && !openAIAPIKey) {
  throw new Error("OPENAI_API_KEY is not configured");
}

export const env = {
  port,
  openAIAPIKey,
  openAIModel,
  aiProvider,
  openAIEmbeddingModel,
};
