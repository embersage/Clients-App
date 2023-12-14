import { Router } from 'express';
import SessionController from '../controllers/sessionController.js';

const sessionController = new SessionController();
const router = new Router();


router.get('/', sessionController.getAll);
router.get('/:id', sessionController.getOne);

export default router;
