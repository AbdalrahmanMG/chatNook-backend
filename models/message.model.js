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
  chatId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat",
    required:true
  },
  message:{
    type: String,
    requried:true
  }
}, {timestamps: true});

messageSchema.virtual('id').get(function (){
  return this._id.toHexString()
})
messageSchema.set('toJSON',{
  virtuals:true
})

module.exports = mongoose.model("Message", messageSchema);
