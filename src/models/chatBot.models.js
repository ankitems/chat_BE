import mongoose from "mongoose";

const { Schema } = mongoose;

const chatBotSchema = new Schema({
  title: { type: String, required: true, unique: true },
  company_name: { type: String, required: true },
  compant_website: { type: String },
  goal: { type: String, required: true },
  greeting_message: { type: String, required: true },
  knowledge_base: { type: String, required: true },
  chat_transfer: { type: Boolean, required: true },
  real_time_meeting: { type: String, required: true },
  script: { type: String, required: true },
});

const ChatBotModel = mongoose.model("Chat-Ai", chatBotSchema);

export default ChatBotModel;
