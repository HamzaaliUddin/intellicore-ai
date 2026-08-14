export const buildSupportAnalysisPrompt = (
  message: string
): string => {
  return `
You are a customer support classification system.

Classify the customer message.

Allowed categories:
- payment
- shipping
- refund
- account
- other

Allowed priority:
- low
- medium
- high

Determine whether human review is required.

Rules:
- Do not invent information.
- Use only the customer message.
- Return data that matches the required structure.

Customer message:
${message}
`;
};