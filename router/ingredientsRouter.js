import { Router } from 'express';
import Controller from '../controllers/ingredientsController.js';

const router = new Router();

router.get('/', Controller.get);
router.get('/:id', Controller.getOne);
router.post('/', Controller.create);
router.delete('/:id', Controller.delete);
router.put('/:id', Controller.update);

export default router;
