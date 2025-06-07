import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    scamType: {
      type: String,
      enum: [
        "Phishing",
        "Investment Fraud",
        "Tech Support Scam",
        "Romance Scam",
        "Job Scam",
        "Shopping Scam",
        "Lottery/Prize Scam",
        "Identity Theft",
        "Other",
      ],
      required: true,
    },
    imageUrl: String,
    imageId: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
