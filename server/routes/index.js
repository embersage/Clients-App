import { Router } from 'express';
import usersRouter from './usersRouter.js';
import sessionsRouter from './sessionsRouter.js';
import promocodesRouter from './promocodesRouter.js';
import tariffsRouter from './tariffsRouter.js';
import paymentsRouter from './paymentsRouter.js';
import notificationsRouter from './notificationsRouter.js';
import currenciesRouter from './currenciesRouter.js';
import emailRouter from './emailRouter.js';

const router = new Router();

router.use('/users', usersRouter);
router.use('/sessions', sessionsRouter);
router.use('/promocodes', promocodesRouter);
router.use('/tariffs', tariffsRouter);
router.use('/payments', paymentsRouter);
router.use('/notifications', notificationsRouter);
router.use('/currencies', currenciesRouter);
router.use('/email', emailRouter);

export default router;
