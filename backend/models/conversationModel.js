import mongoose from "mongoose";

const conversationSchema = mongoose.Schema({
    participants:[{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    lastMessage:{
        Text: String,
        sender: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    },

},{timestamps: true})

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;