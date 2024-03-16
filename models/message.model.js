const mongoose = require("mongoose");
const yup = require("yup");

let messageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  recieverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  message:{
    type: String,
    requried:true
  }
}, {timestamps: true});

module.exports = mongoose.model("Message", messageSchema);
