const express = require("express");
const cors = require("cors");
const { generateContent } = require("./gemini");

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Gemini API Backend is running" });
});

app.get("/health", (req, res) => {
  res.json({ status: "healthy" });
});

app.post("/generate", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const result = await generateContent(prompt);
    res.json({ response: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

if (require.main === module) {
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Gemini API Backend listening on http://localhost:${port}`);
  });
}

module.exports = app;
