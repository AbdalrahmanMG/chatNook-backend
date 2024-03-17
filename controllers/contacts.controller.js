const { User } = require("../models/user.model");

const getContactsSideBar = async (req, res) => {
  try {
    const loggedUserId = req.user.id
    const allContacts = await User.find({
        id:{
            $ne: loggedUserId
        }
    }).select("-password")
    return res.status(200).json(allContacts)
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


module.exports = {getContactsSideBar}