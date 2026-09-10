require("dotenv").config();
const { InferenceClient } = require("@huggingface/inference");
const express = require("express");
const cors = require("cors");

const app = express();
const client = new InferenceClient(process.env.HF_TOKEN);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("AI Email Generator Backend is running!");
});

app.post("/generate", async (req, res) => {
  try {
    const { about, recipient, tone, keyPoints } = req.body;

    const prompt = `
Write a ${tone} email based on the information below.

About: ${about}
Recipient: ${recipient}
Key points: ${keyPoints}

Follow these rules:
- Write only the subject and the email.
- Do not include explanations, notes, tips, or key points.
- Do not use Markdown headings or asterisks.
- Do not include <think> tags.
- Do not add information that was not provided.
- Use placeholders such as [Lecturer's Name] when necessary.

Use exactly this format:

Subject: [subject]

Email:
[email body]
`;

    const response = await client.chatCompletion({
      model: "deepseek-ai/DeepSeek-R1",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 500,
    });

    let message = response.choices[0].message.content;

// Remove complete <think>...</think> sections
message = message.replace(/<think>[\s\S]*?<\/think>/gi, "");

// If <think> has no closing tag, remove everything before it
message = message.replace(/<think>[\s\S]*/gi, "");

// Remove anything after Key Notes
message = message.split(/###\s*Key Notes/i)[0];

// Remove Markdown formatting
message = message.replace(/\*\*/g, "");
message = message.replace(/^#+\s*/gm, "");

// Clean excessive blank lines
message = message.replace(/\n{3,}/g, "\n\n").trim();
    res.json({
      message,
    });
  } catch (error) {
    console.error("AI request failed:", error.message);

    res.status(500).json({
      message: "Failed to generate email.",
    });
  }
});

app.listen(5000, () => {
  console.log("Backend server running on port 5000");
});