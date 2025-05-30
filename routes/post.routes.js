import express from 'express';
import {createPost , deletePost} from '../controllers/post.controller.js';
import upload from '../middlewares/multer.js';
import protect from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/createpost', upload.single('image'), createPost);
router.delete('/deletepost/:id',protect, deletePost);



export default router;
