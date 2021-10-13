import { Router } from 'express';
import { PostController } from '../controllers/post.controller';
import authMiddleware from '../middleware/auth.middleware';
import { uploadMiddleware } from '../middleware/upload.middleware';
import { ValidationMiddleware } from '../middleware/validation.middleware';

const router = Router();

router.use(authMiddleware);

router.post('/create', uploadMiddleware, ValidationMiddleware.createPostAndUpdate(), PostController.createPost);
router.post('/', ValidationMiddleware.getPosts(), PostController.getPosts);
router.get('/pagescount', PostController.getPagesCount);
router.post('/update', uploadMiddleware, ValidationMiddleware.createPostAndUpdate(), PostController.updatePost);
router.post('/delete', PostController.deletePost);

export default router;
