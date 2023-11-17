import { Router } from 'express';
import TariffController from '../controllers/tariffController.js';

const tariffController = new TariffController();
const router = new Router();

router.get('/', tariffController.getAll);
router.get('/:id', tariffController.getOne);
router.post('/create', tariffController.create);

export default router;
