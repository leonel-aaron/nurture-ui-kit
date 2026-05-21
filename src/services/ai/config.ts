export const AI_CONFIG = {
  GEMINI_KEY: import.meta.env.VITE_GEMINI_API_KEY,
  OPENAI_KEY: import.meta.env.VITE_OPENAI_API_KEY,
  MODEL: "gemini-1.5-flash",
  BASE_URL: "https://generativelanguage.googleapis.com/v1beta/models",
};

/**
 * ARCHITECTURE NOTE:
 * Securely access keys using import.meta.env.
 * Never log these keys to the console in production.
 */