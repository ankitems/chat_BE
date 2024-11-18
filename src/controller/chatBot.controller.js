import {
  createChatAI,
  deleteChatAI,
  listAllChatAI,
  updateChatAI,
} from "../service/chatBot.service.js";

// Create Chat-AI
export const createChatBot = async (req, res) => {
  const { title, company_name, goal, greeting_message, knowledge_base } =
    req.body;

  if (
    !title ||
    !company_name ||
    !goal ||
    !greeting_message ||
    !knowledge_base
  ) {
    return res
      .status(400)
      .json({ message: "Please fill in the mandatory details" });
  }

  try {
    const chatAgent = await createChatAI(req.body);
    res.status(201).json(chatAgent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateChatBot = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedChatAgent = await updateChatAI(id, req.body);
    if (!updatedChatAgent) {
      return res.status(404).json({ message: "Chat-AI not found" });
    }
    res.json(updatedChatAgent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteChatBot = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedChatAgent = await deleteChatAI(id);
    if (!deletedChatAgent) {
      return res.status(404).json({ message: "Chat-AI not found" });
    }
    res.json({ message: "Chat-AI deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const listChatBots = async (req, res) => {
  try {
    const allChats = await listAllChatAI();
    res.json(allChats);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
