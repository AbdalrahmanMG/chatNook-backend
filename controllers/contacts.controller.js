const { User } = require("../models/user.model");
const Chat = require("../models/chat.model.js");
const Message = require("../models/message.model.js");

const getContactsSideBar = async (req, res) => {
  try {
    const loggedUserId = req.user.id;
    const allContacts = await User.find({
      id: {
        $ne: loggedUserId,
      },
    }).select("-password");

    return res.status(200).json(allContacts);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// get all chats
const getChats = async (req, res) => {
  const loggedUserId = req.user.id;
  try {
    // let chats = await Chat.find({
    //   participants: { $in: [loggedUserId] },
    // }).populate('participants').populate('messages')

    let chats = await Chat.find({ participants: loggedUserId }).populate(
      "participants",
      "-password"
    );
    if (!chats) {
      return res.status(400).json({success: false, message:"No chats found"})
    }
    for (let chat of chats) {
      let lastMessage = await Message.findOne({ chatId: chat._id }).sort({
        createdAt: -1,
      });
      chat.lastMessage = lastMessage;
    }

    const formattedChats = chats.map((chat) => ({
      _id: chat._id,
      participants: chat.participants,
      lastMessage: chat.lastMessage,
      createdAt: chat.createdAt,
      updatedAt: chat.updatedAt,
    }));

    return res.status(200).json(formattedChats);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getContactsSideBar, getChats };
