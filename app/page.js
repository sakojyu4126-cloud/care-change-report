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
      setResult(data.text || data.error || "エラーが発生しました");
    } catch (err) {
      setResult("通信エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ maxWidth: "700px", margin: "40px auto", padding: "20px", fontFamily: "sans-serif" }}>
      <h2>📋 サービス変更報告 作成アプリ</h2>
      <p style={{ color: "#666" }}>変更内容や申し送り事項を入力して送信してください。</p>
      
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="例：利用者の〇〇様、歩行状態の変化に伴いデイサービスの利用日数を週2回から週3回へ変更..."
          rows={6}
          style={{ width: "100%", padding: "12px", fontSize: "15px", borderRadius: "6px", border: "1px solid #ccc", boxSizing: "border-box" }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{ marginTop: "12px", padding: "12px 24px", fontSize: "16px", cursor: "pointer", backgroundColor: "#0070f3", color: "white", border: "none", borderRadius: "6px", fontWeight: "bold" }}
        >
          {loading ? "作成中..." : "報告書を作成する"}
        </button>
      </form>

      {result && (
        <div style={{ marginTop: "24px", padding: "20px", backgroundColor: "#f8f9fa", borderRadius: "8px", border: "1px solid #e9ecef", whiteSpace: "pre-wrap", lineHeight: "1.6" }}>
          <h3 style={{ marginTop: 0 }}>作成結果:</h3>
          <div>{result}</div>
        </div>
      )}
    </main>
  );
}
