import { HfInference } from '@huggingface/inference';
import { Message } from '../../types';
import { config } from '../../config';

export class AIService {
  private hf: HfInference;
  private model: string;

  constructor() {
    if (!config.huggingFaceApiKey) {
      throw new Error('Hugging Face API key is not configured. Please set VITE_HUGGINGFACE_API_KEY in your environment variables.');
    }
    this.hf = new HfInference(config.huggingFaceApiKey);
    this.model = config.huggingFaceModel;
  }

  private async generateResponse(prompt: string): Promise<{ text: string; confidence: number }> {
    try {
      const response = await this.hf.textGeneration({
        model: this.model,
        inputs: prompt,
        parameters: {
          max_length: 512,
          temperature: 0.7,
          top_p: 0.95,
        },
      });

      const text = response.generated_text;
      const confidence = this.calculateConfidence(text);

      return { text, confidence };
    } catch (error) {
      console.error('Error generating AI response:', error);
      throw new Error('Failed to generate AI response');
    }
  }

  private calculateConfidence(text: string): number {
    const length = text.length;
    if (length > 200) return 0.9;
    if (length > 100) return 0.7;
    if (length > 50) return 0.5;
    return 0.3;
  }

  public async analyzeMessage(userMessage: string, context?: string): Promise<Message> {
    const prompt = context 
      ? `Context: ${context}\nQuestion: ${userMessage}\nAnswer:`
      : `Question: ${userMessage}\nAnswer:`;

    const { text, confidence } = await this.generateResponse(prompt);

    return {
      id: crypto.randomUUID(),
      content: text,
      role: 'assistant',
      timestamp: new Date().toISOString(),
      confidence,
      type: 'text'
    };
  }
}

// Export a singleton instance
export const aiService = new AIService(); 