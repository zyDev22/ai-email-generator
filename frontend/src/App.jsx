import { useState } from "react";
function App() {
  const [about, setAbout] = useState("");
  const [recipient, setRecipient] = useState("");
  const [tone, setTone] = useState("Professional");
  const [keyPoints, setKeyPoints] = useState("");
  const [result, setResult] = useState("");
  console.log("MY AI EMAIL APP IS RUNNING");
  const handleGenerate = async () => {
  console.log("About:", about);
  console.log("Recipient:", recipient);
  console.log("Tone:", tone);
  console.log("Key Points:", keyPoints);
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

setResult(data.message);
};
  return (
    <div>
      <h1>AI Email Generator</h1>

      <label>What is the email about?</label>
      <input
  type="text"
  placeholder="e.g. Ask for an assignment extension"
  value={about}
  onChange={(e) => setAbout(e.target.value)}
/>

      <br />
      <br />

      <label>Who is it for?</label>
      <input
  type="text"
  placeholder="e.g. Lecturer"
  value={recipient}
  onChange={(e) => setRecipient(e.target.value)}
/>

      <br />
      <br />

      <label>Tone</label>
      <select
  value={tone}
  onChange={(e) => setTone(e.target.value)}
>
  <option>Professional</option>
  <option>Friendly</option>
  <option>Formal</option>
</select>

      <br />
      <br />

      <label>Key points</label>
      <textarea
  placeholder="Enter any important points"
  value={keyPoints}
  onChange={(e) => setKeyPoints(e.target.value)}
></textarea>

      <br />
      <br />

      <button onClick={handleGenerate}>Generate Email</button>
      {result && (
  <div>
    <h2>Generated Email</h2>
    <p>{result}</p>
  </div>
)}
    </div>
  );
}

export default App;