import express from 'express';

import { searchTeam } from '../controllers/search.js';

const router = express.Router();

router.get('/', searchTeam);

export default router;