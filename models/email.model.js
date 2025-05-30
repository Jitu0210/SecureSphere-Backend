import mongoose from "mongoose";

const EmailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true
  },
  verdict: {
    type: String,
    enum: ['spam', 'safe'],
    required: true
  }
});

const Email =  mongoose.model('Email', EmailSchema);

export default Email