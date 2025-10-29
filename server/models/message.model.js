import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema(
    {
        threadId  : { type: mongoose.Schema.Types.ObjectId, ref: "ChatThread" },
        senderId  :       { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        text      :                                                      String,
        seen      :                           { type: Boolean, default: false },
    }, 
    {
        timestamps:                                                         true 
    }
);

const Message = mongoose.model('Message', MessageSchema);   

export default Message;