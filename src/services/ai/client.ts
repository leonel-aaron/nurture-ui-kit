import { AI_CONFIG } from "./config";

/**
 * AI CLIENT - Secure API Bridge
 */

export const sendAIRequest = async (prompt: string) => {
  // Use securely loaded Vite environment keys
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey || apiKey === '674342423Duval' || apiKey.length < 10) {
    throw new Error('NEURAL_KEY_PROTOCOL_ERROR: Invalid or missing API core key.');
  }

  const url = `${AI_CONFIG.BASE_URL}/${AI_CONFIG.MODEL}:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.85,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      },
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Neural Node Link Failure:", errorData);
    throw new Error(errorData.error?.message || "NEURAL_CORE_LINK_ERROR");
  }

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
};