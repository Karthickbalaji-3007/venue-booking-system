import { GoogleGenAI, Type, Schema } from "@google/genai";
import { Venue, AIRecommendation } from "../types";

// Initialize Gemini client
// Note: In a real production app, you might proxy this through a backend to hide the key,
// but for this frontend-only demo, we use the env variable directly as per instructions.
const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const recommendationSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    venueIds: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of IDs of the venues that best match the user's request.",
    },
    reasoning: {
      type: Type.STRING,
      description: "A friendly, short explanation of why these venues were chosen based on the user's vibe or requirements.",
    }
  },
  required: ["venueIds", "reasoning"],
};

export const getSmartRecommendations = async (
  query: string,
  availableVenues: Venue[]
): Promise<AIRecommendation> => {
  if (!apiKey) {
    console.warn("API Key missing, returning empty AI response");
    return { venueIds: [], reasoning: "AI Service unavailable (Missing API Key)." };
  }

  // simplify venue object for token efficiency
  const venueSummaries = availableVenues.map(v => ({
    id: v.id,
    name: v.name,
    description: v.description,
    features: v.features,
    location: v.location,
    price: v.pricePerHour,
    capacity: v.capacity
  }));

  const prompt = `
    You are an expert Venue Concierge. 
    User Query: "${query}"
    
    Here is the list of available venues:
    ${JSON.stringify(venueSummaries)}
    
    Select the best matching venues (max 3). Consider the user's implicit intent (e.g., "cheap" = low price, "huge" = high capacity, "vibe" = description/features).
    Return the IDs and a short reasoning.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: recommendationSchema,
        temperature: 0.3, // Lower temperature for more deterministic matching
      }
    });

    const result = JSON.parse(response.text || '{}');
    return {
      venueIds: result.venueIds || [],
      reasoning: result.reasoning || "Here are some venues you might like."
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      venueIds: [],
      reasoning: "I'm having trouble connecting to the concierge service right now."
    };
  }
};
