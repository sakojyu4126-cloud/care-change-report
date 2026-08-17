"use client";
import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input) return;
    setLoading(true);
    setResult("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });
      const data = await res.json();
      setResult(data.text || "エラーが発生しました");
    } catch (err) {
      setResult("通信エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    
      🤖 Gemini Web App
      
         setInput(e.target.value)}
          placeholder="質問やテキストを入力してください..."
          rows={4}
          style={{ width: "100%", padding: "10px", fontSize: "16px", borderRadius: "6px", border: "1px solid #ccc" }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{ marginTop: "10px", padding: "10px 20px", fontSize: "16px", cursor: "pointer", backgroundColor: "#0070f3", color: "white", border: "none", borderRadius: "6px" }}
        >
          {loading ? "考え中..." : "送信する"}
        </button>
      </form>
      {result && (
        <div style={{ marginTop: "20px", padding: "15px", backgroundColor: "#f4f4f4", borderRadius: "6px", whiteSpace: "pre-wrap" }}>
          <h3>回答:</h3>
          <p>{result}</p>
        </div>
      )}
    </main>
  );
}
