const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;

let genAI = null;
let model = null;

function initializeClient() {
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is not set");
  }
  genAI = new GoogleGenerativeAI(apiKey);
  model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });
}

async function generateContent(prompt) {
  if (!model) {
    initializeClient();
  }

  const result = await model.generateContent(prompt);
  const response = result.response;
  return response.text();
}

module.exports = { generateContent, initializeClient };
