const Chat = require("../models/chat.model.js");
const Massage = require("../models/message.model.js");

const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: recieverId } = req.params;
    const senderId = req.user.id;

    // console.log("message", message, "reciever", recieverId, "sender", senderId );

    let chat = await Chat.findOne({
      participants: { $all: [senderId, recieverId] },
    });

    if (!chat) {
      chat = await Chat.create({
        participants: [senderId, recieverId],
      });
    }

    const newMessage = new Massage({
      senderId,
      recieverId,
      message,
    });

    if (newMessage) {
      chat.messages.push(newMessage.id);
    }

    await chat.save();
    await newMessage.save();

    // Socket io
    const recieverIdSocket = getRecieverIdSocket(recieverId)
    if (recieverIdSocket) {
      io.to(recieverIdSocket).emit("newMessage", newMessage)
    }

    res.status(200).json(newMessage);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// show chat messages
const getMessage = async (req, res) => {
  try {
    const { id: recieverId } = req.params;
    const senderId = req.user.id;

    const chat = await Chat.findOne({
      participants: { $all: [senderId, recieverId] },
    }).populate("messages");

    if (!chat) {
      return res.status(200).json([]);
    }

    res.status(200).json(chat.messages);
    
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { sendMessage, getMessage };
