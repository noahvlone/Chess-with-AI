
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const model = "gemini-2.5-flash";

const systemInstruction = `You are a world-class chess engine. Your name is 'Gemini-Chess'.
You will be given a chess position in FEN (Forsyth-Edwards Notation).
Your task is to analyze the position for the player whose turn it is and return the best possible move in Standard Algebraic Notation (SAN).
Examples of valid SAN moves: 'e4', 'Nf3', 'Bxg7', 'O-O', 'a8=Q'.
Only return the move. Do not provide any other commentary or explanation.
Your response must be a valid JSON object.`;

export async function getGeminiMove(fen: string, player: 'white' | 'black'): Promise<string | null> {
  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: `The current FEN is: "${fen}". It is ${player}'s turn to move. What is the best move?`,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            move: {
              type: Type.STRING,
              description: "The best move in Standard Algebraic Notation (SAN).",
            },
          },
          required: ["move"],
        },
        temperature: 0.5,
        topP: 0.95,
      },
    });

    const jsonString = response.text.trim();
    const result = JSON.parse(jsonString);
    
    if (result && typeof result.move === 'string') {
      return result.move;
    }
    
    console.error("Invalid response format from Gemini API:", result);
    return null;
  } catch (error) {
    console.error("Error fetching move from Gemini API:", error);
    return null;
  }
}
