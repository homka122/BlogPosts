import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import PostRouter from './postRouter';

const router = Router();

router.post('/registration', UserController.registration);
router.post('/login', UserController.login);
router.get('/logout', UserController.logout);
router.get('/refresh', UserController.refresh);

router.use('/post', PostRouter);

export default router;
