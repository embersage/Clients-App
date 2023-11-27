import { Router } from 'express';
import UserController from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware.js';

const userController = new UserController();
const router = new Router();

router.get('/auth', authMiddleware, userController.check);
router.get('/', checkRoleMiddleware([2, 3]), userController.getAll);
router.get('/:id', checkRoleMiddleware([2, 3]), userController.getOne);
router.put('/:id', checkRoleMiddleware([2, 3]), userController.update);
router.post('/login', userController.login);

export default router;
