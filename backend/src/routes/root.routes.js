import { Router } from 'express';
import { getRoot } from '../controllers/root.controller.js';

// Root routes.
const router = Router();

router.get('/', getRoot);

export default router;
