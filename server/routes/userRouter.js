import { Router } from 'express';
import multer from 'multer';
import UserController from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware.js';

const userController = new UserController();
const router = new Router();
const upload = new multer();

router.get('/auth', authMiddleware, userController.check);
router.get('/', checkRoleMiddleware([2, 3]), userController.getAll);
router.get('/:id', checkRoleMiddleware([2, 3]), userController.getOne);
router.post('/login', userController.login);
router.post('/import', upload.single('file'), userController.import);
router.put('/:id', checkRoleMiddleware([2, 3]), userController.update);
router.delete('/:id', checkRoleMiddleware([2, 3]), userController.delete);

export default router;
