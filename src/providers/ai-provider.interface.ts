export interface AIProvider {
  generateText(message: string): Promise<string>;
}