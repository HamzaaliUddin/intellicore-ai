export interface AIProvider {
  generateText(message: string): Promise<string>;

  generateJSON(message: string): Promise<unknown>;

  streamText(message: string): AsyncIterable<string>;
}