import ChatBotModel from "../models/chatBot.models.js";

// Create Chat-AI
export const createChatAI = async (data) => {
  const newUser = new ChatBotModel(data);
  await newUser.save();
  return newUser;
};

// Update Chat-AI
export const updateChatAI = async (id, data) => {
  const updatedChat = await ChatBotModel.findByIdAndUpdate(id, data, {
    new: true,
  });
  return updatedChat;
};

// Delete Chat-AI
export const deleteChatAI = async (id) => {
  const deletedChat = await ChatBotModel.findByIdAndDelete(id);
  return deletedChat;
};

// List All Chat-AI
export const listAllChatAI = async () => {
  const allChats = await ChatBotModel.find({});
  return allChats;
};
