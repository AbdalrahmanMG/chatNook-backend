const mongoose = require("mongoose");

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
  chatName:{
    type: String,
    default: ''  // defalut should be the reciever name 
  },
  isGroup:{
    type: Boolean,
    default: false
  }
}, {timestamps: true});

chatSchema.virtual('id').get(function (){
  return this._id.toHexString()
})
chatSchema.set('toJSON',{
  virtuals:true
})

module.exports = mongoose.model("Chat", chatSchema);
