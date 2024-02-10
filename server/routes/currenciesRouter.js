import { Router } from 'express';
import CurrencyController from '../controllers/currencyController.js';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware.js';

const currencyController = new CurrencyController();
const router = new Router();

router.get('/', checkRoleMiddleware([2, 3]), currencyController.getAll);

export default router;
