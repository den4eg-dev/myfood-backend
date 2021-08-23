import { Router } from 'express';
import ingredientsRouter from './ingredientsRouter.js';
const router = new Router();

router.use('/ingredients', ingredientsRouter);

export default router;
