const express = require("express");
const axios = require("axios");
require("dotenv").config();
const app = express();
app.use(express.json());

// OpenAI API credentials
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Route to handle incoming chat messages
app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    // Make a request to the OpenAI API to generate a response to the chat message
    const response = await axios.post(
      "https://api.openai.com/v1/engines/davinci-codex/completions",
      {
        prompt: message,
        max_tokens: 100,
        temperature: 0.5,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    // Send the generated response back to the client
    res.send(response.data.choices[0].text);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send("An error occurred while generating the chat response");
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
