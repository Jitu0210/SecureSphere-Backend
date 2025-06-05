import express from 'express';
import {createPost , deletePost,getAllPosts,getMyPosts} from '../controllers/post.controller.js';
import upload from '../middlewares/multer.js';
import protect from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/createpost',protect, upload.single('image'), createPost);
router.delete('/deletepost/:id',protect, deletePost);
router.get('/myposts', protect, getMyPosts);  
router.get('/posts', getAllPosts);

export default router;