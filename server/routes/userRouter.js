import { Router } from 'express';
import UserController from '../controllers/userController.js';

const router = new Router();

router.post('/', UserController.create);
router.get('/', UserController.getAll);
router.get('/:id', UserController.getOne);
router.post('/login', UserController.login);
router.get('/auth', UserController.check);

export default router;
