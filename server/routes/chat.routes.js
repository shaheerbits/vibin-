import { Router } from "express";
import { getNewChatThread, sendNewMessage, getAllMessages } from "../controllers/chat.controller.js";

const chatRouter = Router();

chatRouter.post("/start", getNewChatThread);
chatRouter.post("/:threadId/message", sendNewMessage);
chatRouter.get("/:threadId/messages", getAllMessages);

export default chatRouter;