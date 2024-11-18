import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Define Chat schema
const ChatSchema = new Schema({
  roomName: {
    type: String,
    required: true,
    unique: true,
  },
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  isAI: {
    type: Boolean,
    default: false,
  },
});

const Chat = mongoose.model("Chat", ChatSchema);
export default Chat;
