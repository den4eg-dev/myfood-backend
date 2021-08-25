import { Router } from 'express';
import ingredientsRouter from './ingredientsRouter.js';
import dishesRouter from './dishesRouter.js';

const router = new Router();

router.use('/ingredients', ingredientsRouter);
router.use('/dishes', dishesRouter);

export default router;
