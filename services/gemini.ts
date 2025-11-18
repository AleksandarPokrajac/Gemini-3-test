import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

// Check if API key is available, but don't crash immediately if not (allow UI to show warning)
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const generateInterviewQuestions = async (role: string, industry: string): Promise<string> => {
  if (!ai) return "API Key not configured.";
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `I am an IT Executive preparing to interview a ${role} in the ${industry} industry to align our IT strategy.
      Generate a list of 5 strategic, high-level questions I should ask them to understand their business goals and pain points.
      Format the output as a clean Markdown list.`,
    });
    return response.text || "No response generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Failed to generate questions. Please check your connection or API limits.";
  }
};

export const generateSmartMetrics = async (goal: string): Promise<string> => {
  if (!ai) return "API Key not configured.";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `I have a strategic IT goal: "${goal}".
      Suggest 3 specific SMART (Specific, Measurable, Achievable, Relevant, Time-bound) metrics to measure progress towards this goal.
      Return the response as a JSON array of objects with 'metric' and 'target' properties.`,
       config: {
        responseMimeType: "application/json"
      }
    });
    return response.text || "[]";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "[]";
  }
};
