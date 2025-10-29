import ChatThread from "../models/chatThread.model.js";
import Message from "../models/message.model.js";

export const getNewChatThread = async (req, res) => {
  try {
    const { participants } = req.body;

    const newThread = await ChatThread.create({
        participants,
    });

    return res.status(201).json(newThread);
  } catch (error) {
    console.error("Error creating new chat thread:", error);
    return res.status(500).json({ error: "Failed to create new chat thread" });
  }
};

export const sendNewMessage = async (req, res) => {
  try {
    const { threadId } = req.params;
    const { sender, content } = req.body;

    const newMessage = await Message.create({
      threadId,
      sender,
      content,
    });

    return res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error sending new message:", error);
    return res.status(500).json({ error: "Failed to send new message" });
  }
};

export const getAllMessages = async (req, res) => {
  try {
    const { threadId } = req.params;

    const messages = await Message.find({ threadId });

    return res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return res.status(500).json({ error: "Failed to fetch messages" });
  }
};
