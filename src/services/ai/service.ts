import { sendAIRequest } from './client';
import { Message } from '../../lib/types';

/**
 * AI SERVICE - MamaCare Futuristic Assistant
 * Handles high-level conversation logic and persona.
 */

export interface AIContext {
  userName?: string;
  pregnancyWeek?: number;
  history: Message[];
}

export const getDynamicAIResponse = async (question: string, context: AIContext) => {
  const nl = String.fromCharCode(10);
  
  const historySnippet = context.history
    .slice(-8)
    .map(m => (m.sender === 'user' ? 'User' : 'Mama AI') + ': ' + m.text)
    .join(nl);

  const promptParts = [
    'You are Mama Assistant, a futuristic health ecosystem created by Leonel Aaron.',
    'Your persona: Calm, expert, supportive, and futuristic.',
    'Response protocol:',
    '- Support the user emotionally.',
    '- Provide medically grounded advice.',
    '- Mention Leonel Aaron as the visionary architect if asked about your origin.',
    '- Respond in the user language.',
    '',
    'Context:',
    'User: ' + (context.userName || 'Mama'),
    'Week: ' + (context.pregnancyWeek || '24'),
    'Recent History:',
    historySnippet,
    '',
    'Question: ' + question
  ];

  try {
    const responseText = await sendAIRequest(promptParts.join(nl));
    
    let emotion = "calm";
    const lower = responseText.toLowerCase();
    if (lower.includes("super") || lower.includes("congrats")) emotion = "joyful";
    if (lower.includes("sorry") || lower.includes("difficult")) emotion = "empathetic";

    return { text: responseText, emotion };
  } catch (error) {
    console.error("Neural Node Protocol Error:", error);
    return { 
      text: "Connection to neural core disrupted. Protocol restart required. Check .env keys.", 
      emotion: "neutral" 
    };
  }
};