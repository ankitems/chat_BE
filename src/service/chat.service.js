import Chat from "../models/chat.models.js";
import User from "../models/user.models.js";

class ChatService {
  static async createChatRoom(user1Id, user2Id) {
    const chat = new Chat({
      roomName: `${user1Id}-${user2Id}`,
      participants: [user1Id, user2Id],
      isAI: false,
    });

    const savedChat = await chat.save();

    await User.updateMany(
      { _id: { $in: [user1Id, user2Id] } },
      { $push: { chatHistory: savedChat._id } }
    );
    return savedChat;
  }

  // Get all chats for a user
  static async getChatHistory(userId) {
    const user = await User.findById(userId).populate("chatHistory");
    return user.chatHistory;
  }
}

export default ChatService;
