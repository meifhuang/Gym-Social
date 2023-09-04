const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
    archived: {type: Boolean, default: false}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conversation", ConversationSchema);