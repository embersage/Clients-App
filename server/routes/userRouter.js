import { Router } from 'express';
import UserController from '../controllers/userController.js';

const userController = new UserController();
const router = new Router();

router.get('/auth', userController.check);
router.get('/', userController.getAll);
router.get('/:id', userController.getOne);
router.post('/login', userController.login);
router.post('/create', userController.create);

export default router;
