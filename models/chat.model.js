const mongoose = require("mongoose");
const yup = require("yup");

let chatSchema = new mongoose.Schema({
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required:true
    },
  ],
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
      default: [],
    },
  ],
}, {timestamps: true});

chatSchema.virtual('id').get(function (){
  return this._id.toHexString()
})
chatSchema.set('toJSON',{
  virtuals:true
})

module.exports = mongoose.model("Chat", chatSchema);
