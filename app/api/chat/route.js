import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  try {
    const { prompt } = await req.json();
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
    
    // システム指示とモデルの指定
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: "あなたは介護・福祉の専門アシスタントです。入力された情報をもとに、わかりやすいサービス変更報告を作成してください。",
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    return Response.json({ text: response.text() });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
