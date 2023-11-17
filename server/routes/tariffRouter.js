import { Router } from 'express';
import TariffController from '../controllers/tariffController.js';

const router = new Router();

router.post('/', TariffController.create);
router.get('/', TariffController.getAll);
router.get('/:id', TariffController.getOne);

export default router;
