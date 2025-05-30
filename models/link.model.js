import mongoose, { mongo } from "mongoose";

const linkSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  result: {
    type: String,
  },
  checkedAt: {
    type: Date,
    default: Date.now(),
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Link = mongoose.model("Link", linkSchema);

export default Link;
