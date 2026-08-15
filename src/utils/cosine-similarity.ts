export const cosineSimilarity = (a: number[], b: number[]): number => {
  if (a.length !== b.length) {
    throw new Error("Vector dimensions must match");
  }

  const dotProduct = a.reduce(
    (sum, value, index) => sum + value * (b[index] ?? 0),
    0,
  );

  const magnitudeA = Math.sqrt(
    a.reduce((sum, value) => sum + value * value, 0),
  );

  const magnitudeB = Math.sqrt(
    b.reduce((sum, value) => sum + value * value, 0),
  );

  if (magnitudeA === 0 || magnitudeB === 0) {
    return 0;
  }

  return dotProduct / (magnitudeA * magnitudeB);
};
