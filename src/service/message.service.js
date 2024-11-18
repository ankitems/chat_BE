import mongoose from "mongoose";
import Message from "../models/message.models.js";
import Chat from "../models/chat.models.js";

class MessageService {
  static async sendMessage(senderId, roomId, messageText) {
    try {
      // Find the chat room using roomName instead of _id
      const chat = await Chat.findOne({ roomName: roomId });
      if (!chat) throw new Error("Chat room not found");

      // Create the message and associate it with the found chat room's _id
      const message = new Message({
        senderId,
        roomId: chat._id,
        message: messageText,
        messageType: "text",
      });

      const savedMessage = await message.save();
      return savedMessage;
    } catch (error) {
      console.error("Error in sendMessage:", error);
      throw error;
    }
  }

  static async getMessages(roomId) {
    try {
      console.log("roomin", roomId);
      const chat = await Chat.findOne({ roomName: roomId });
      if (!chat) throw new Error("Chat room not found");
      console.log("fnal", chat);
      // Retrieve all messages for the chat's _id
      const messages = await Message.find({ roomId: chat._id });
      return messages;
    } catch (error) {
      console.error("Error in getMessages:", error);
      throw error;
    }
  }
}

export default MessageService;
