import { useState } from "react";
import "./App.css";

function App() {
  const [about, setAbout] = useState("");
  const [recipient, setRecipient] = useState("");
  const [tone, setTone] = useState("Professional");
  const [keyPoints, setKeyPoints] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    try {
      setLoading(true);
      setResult("");

      const response = await fetch("http://localhost:5000/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          about,
          recipient,
          tone,
          keyPoints,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to generate email");
      }

      setResult(data.message);
    } catch (error) {
      console.error("Generation error:", error);
      setResult("Failed to generate email.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result);
      alert("Email copied!");
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  return (
  <div className="app">
    <div className="brand">MeeraZ</div>
    <h1>AI Email Generator</h1>

      <div className="form-group">
        <label>What is the email about?</label>
        <input
          type="text"
          placeholder="e.g. Ask for an assignment extension"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Who is it for?</label>
        <input
          type="text"
          placeholder="e.g. Lecturer"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Tone</label>
        <select
          value={tone}
          onChange={(e) => setTone(e.target.value)}
        >
          <option>Professional</option>
          <option>Friendly</option>
          <option>Formal</option>
        </select>
      </div>

      <div className="form-group">
        <label>Key points</label>
        <textarea
          placeholder="Enter any important points"
          value={keyPoints}
          onChange={(e) => setKeyPoints(e.target.value)}
        />
      </div>

      <button
        className="generate-button"
        onClick={handleGenerate}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Email"}
      </button>

      {result && (
        <div className="generated-email">
          <h2>Generated Email</h2>

          <div className="email-result">
            {result}
          </div>

          <button
            className="copy-button"
            onClick={handleCopy}
          >
            Copy Email
          </button>
        </div>
      )}
    </div>
  );
}

export default App;