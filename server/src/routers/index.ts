import { Router } from 'express';
import PostRouter from './postRouter';
import AuthRouter from './authRouter';

const router = Router();

router.use('/auth', AuthRouter);
router.use('/post', PostRouter);

export default router;
