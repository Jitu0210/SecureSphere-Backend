import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: String,
  imageUrl: String,
  imageId: String, 
});

const Post = mongoose.model('Post', postSchema);

export default Post
