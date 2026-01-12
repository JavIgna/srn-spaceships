import { Router } from 'express';
import { getSpaceships } from '../controllers/spaceships.controller.js';

const router = Router();

router.get('/api/spaceships', getSpaceships);

export default router;