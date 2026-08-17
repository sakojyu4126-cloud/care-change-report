import { GoogleGenAI } from "@google/genai";

export async function POST(req) {
  try {
    const { prompt } = await req.json();
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        // 必要に応じてここにシステム指示（役割）を追加可能
        systemInstruction: "あなたは親切なAIアシスタントです。"
      }
    });

    return Response.json({ text: response.text });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
