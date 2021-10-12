import { Router } from 'express';
import { PostController } from '../controllers/post.controller';
import authMiddleware from '../middleware/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.post('/create', PostController.createPost);
router.get('/', PostController.getPosts);
router.post('/update', PostController.updatePost);
router.post('/delete', PostController.deletePost);

export default router;
