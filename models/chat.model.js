const mongoose = require("mongoose");

let chatSchema = new mongoose.Schema(
  {
    chatName: {
      type: String,
    },
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
  },
  { timestamps: true }
);

chatSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
chatSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("Chat", chatSchema);
