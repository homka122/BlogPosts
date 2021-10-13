import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { ValidationMiddleware } from '../middleware/validation.middleware';

const router = Router();

router.post('/registration', ValidationMiddleware.registration(), UserController.registration);
router.post('/login', UserController.login);
router.get('/logout', UserController.logout);
router.get('/refresh', UserController.refresh);

export default router;
