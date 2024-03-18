const { User } = require("../models/user.model");
const Chat = require("../models/chat.model.js");

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
    let chats = await Chat.find({
      participants: { $in: [loggedUserId] },
    }).populate('participants').populate('messages')

    return res.status(200).json(chats);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getContactsSideBar, getChats };
