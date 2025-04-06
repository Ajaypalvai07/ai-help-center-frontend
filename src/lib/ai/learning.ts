import type { Message } from '../../types';
import api from '../api';
import { aiService } from './index';

export interface AnalysisResponse {
  message: Message;
  confidence?: number;
}

export class AILearningEngine {
  private context: string;

  constructor() {
    this.context = '';
  }

  public async suggestSolution(messages: Message[]): Promise<Message> {
    // Build context from previous messages
    this.context = messages
      .map(m => `${m.role}: ${m.content}`)
      .join('\n');

    const lastMessage = messages[messages.length - 1];
    return aiService.analyzeMessage(lastMessage.content, this.context);
  }

  public async learn(feedback: boolean, message: Message): Promise<void> {
    // Store feedback for future improvements
    console.log('Learning from feedback:', { feedback, message });
  }
}

export const aiLearningEngine = new AILearningEngine();

export async function submitFeedback(message: Message, rating: number, comment?: string) {
  try {
    if (!message.id) {
      throw new Error('Message ID is required for feedback');
    }

    const feedbackData = {
      messageId: message.id,
      rating,
      comment
    };
    
    await api.chat.submitFeedback(message.id, feedbackData);
    return true;
  } catch (error) {
    console.error('Error submitting feedback:', error);
    return false;
  }
}