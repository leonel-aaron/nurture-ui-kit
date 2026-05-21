// Redirection du point d'entrée vers la nouvelle architecture propre
export * from './ai/index';

import { Message } from '../lib/types';
import { getDynamicAIResponse } from './ai/service';

// Maintenir la compatibilité avec les anciens appels
export const getAIResponse = async (question: string, context: any) => {
  return getDynamicAIResponse(question, context);
};

export const getSuggestedReplies = (lastAIResponse: string) => {
  const text = lastAIResponse.toLowerCase();
  if (text.includes("nutrition") || text.includes("manger")) return ["Recette saine ?", "Puis-je boire du café ?", "Prise de poids"];
  if (text.includes("sommeil") || text.includes("fatigue")) return ["Meilleures positions", "Tisanes sûres", "Conseils siestes"];
  if (text.includes("leonel") || text.includes("créateur")) return ["Sa vision", "Contacter l'équipe", "Autres projets"];
  return ["Merci Mama AI", "Et bébé ?", "Conseil santé du jour"];
};