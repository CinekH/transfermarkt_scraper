import express from 'express';

import { getResults } from '../controllers/teams.js';

const router = express.Router();

router.get('/results', getResults);

export default router;