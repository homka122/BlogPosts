import { Router } from 'express';
import { PostController } from '../controllers/post.controller';
import authMiddleware from '../middleware/auth.middleware';
import { ValidationMiddleware } from '../middleware/validation.middleware';

const router = Router();

router.use(authMiddleware);

router.post('/create', ValidationMiddleware.createPostAndUpdate(), PostController.createPost);
router.get('/', PostController.getPosts);
router.post('/update', ValidationMiddleware.createPostAndUpdate(), PostController.updatePost);
router.post('/delete', PostController.deletePost);

export default router;
