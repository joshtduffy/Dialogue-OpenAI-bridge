
import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(bodyParser.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const DIALOGUE_API_KEY = process.env.DIALOGUE_API_KEY; // placeholder

app.post("/dialogue-webhook", async (req, res) => {
  try {
    const userMessage = req.body.message || "No message received";
    const conversationId = req.body.conversationId || "unknown";

    console.log("Received from Dialogue:", userMessage);

    // Call OpenAI
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: userMessage }
        ]
      })
    });

    const data = await response.json();
    const reply = data.choices[0].message.content;
    console.log("Reply from OpenAI:", reply);

    // Placeholder for sending back to Dialogue API
    if (DIALOGUE_API_KEY) {
      console.log("Would send reply to Dialogue:", reply);
    }

    res.json({ reply });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Server error");
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
