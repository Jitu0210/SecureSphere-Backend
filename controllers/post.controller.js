import Post from "../models/post.model.js";
import cloudinary from "../utils/Cloudinary.js";
import fs from "fs";

const createPost = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    const result = await cloudinary.uploader.upload(file.path, {
      folder: "posts",
    });

    // Remove local file after uploading
    fs.unlinkSync(file.path);

    // Save post
    const newPost = new Post({
      title: req.body.title,
      description: req.body.description,
      imageUrl: result.secure_url,
      imageId: result.public_id,
      userId: req.user._id,
    });

    await newPost.save();

    res.status(201).json(newPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (post.userId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ error: "Unauthorized to delete this post" });
    }

    if (post.imageId) {
      await cloudinary.uploader.destroy(post.imageId);
    }

    await Post.findByIdAndDelete(id);

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getMyPosts = async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.user._id });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("userId", "username email");
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export { createPost, deletePost, getAllPosts, getMyPosts };
