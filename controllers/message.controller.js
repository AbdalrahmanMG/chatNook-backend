const Chat = require("../models/chat.model.js");
const Massage = require("../models/message.model.js");

// sending messages and creating chat
const sendMessage = async (req, res) => {
  try {
    const { recieverId, message, chatId } = req.body;
    const senderId = req.user.id;
    console.log("recieverid", recieverId, "message", message, "chatid", chatId);
   
    let chat = await Chat.findOne({
      _id: chatId,
    }).populate("messages");

    console.log('chat', chat);
    if (!chat) {
      chat = await Chat.create({
        participants: [senderId, recieverId],
      });
    }
    console.log('chat', chat);


    const newMessage = new Massage({
      senderId,
      chatId: chatId ? chatId : chat.id,
      message,
    });

    if (newMessage) {
      chat.messages.push(newMessage.id);
    }

    await chat.save();
    await newMessage.save();

    res.status(200).json(newMessage);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// show messages
const getChatMessages = async (req, res) => {
  try {
    const { id: chatId } = req.params;
    console.log("chatid", chatId);

    const chat = await Chat.findOne({
      _id: chatId,
    }).populate("messages");

    console.log(chat);
    if (!chat) {
      return res.status(200).json([]);
    }

    res.status(200).json(chat);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// show messages
const createChat = async (req, res) => {
  try {
    const senderId = req.user.id;
    const { isGroup, recieversIds, chatName } = req.body;
    let chat;

    if (!isGroup) {
      return res.status(200).json([]);
    } else {
      chat = await Chat.create({
        chatName,
        participants: [senderId, ...recieversIds],
        isGroup,
      });
    }

    await chat.save();
    res.status(200).json(chat);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { sendMessage, getChatMessages, createChat };
