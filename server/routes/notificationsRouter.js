import { Router } from 'express';
import NotificationController from '../controllers/notificationController.js';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware.js';

const notificationController = new NotificationController();
const router = new Router();

router.get('/', checkRoleMiddleware([2, 3]), notificationController.getAll);
router.get('/:id', checkRoleMiddleware([2, 3]), notificationController.getOne);

export default router;
