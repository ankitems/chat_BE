import dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function retryWithBackoff(requestFn, retries = 3, delay = 2000) {
  try {
    return await requestFn();
  } catch (error) {
    if (retries > 0 && error.response && error.response.status === 429) {
      console.log(`Rate limit hit. Retrying in ${delay}ms...`);
      await new Promise((res) => setTimeout(res, delay));
      return retryWithBackoff(requestFn, retries - 1, delay * 2); // Double the delay on each retry
    }
    throw error;
  }
}

export async function getChatGPTResponse(req, res) {
  const { userMessage } = req.body;

  try {
    // Wrap the OpenAI API call in the retryWithBackoff function
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userMessage }],
    });
    console.log("finalresponse", response.data.choices);
    const assistantMessage = response.data.choices[0].message.content.trim();
    res.json({ message: assistantMessage });
  } catch (error) {
    console.error("Error fetching response from ChatGPT:", error);
    res.status(500).json({ message: "Error with ChatGPT response." });
  }
}
