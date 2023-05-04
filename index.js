const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
const axios = require("axios");
require("dotenv").config();
const app = express();
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Route to handle incoming chat messages
app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    // Make a request to the OpenAI API to generate a response to the chat message
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "How to cure a plant disease?",
      temperature: 0,
      max_tokens: 150,
      // top_p: 1,
      // frequency_penalty: 0.5,
      // presence_penalty: 0,
      // stop: ["You:"],
    });

    // Send the generated response back to the client
    console.log(response.data.choices);
    res.json(response.data.choices[0].text);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send("An error occurred while generating the chat response");
  }
});

app.get("/", (req, res) => {
  res.json({ message: "I'm OpenAI chatbot" });
});
// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
