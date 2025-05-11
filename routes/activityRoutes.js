import express from 'express';
import { createActivity, getActivities, getActivity } from '../controllers/actvityController.js';

const router = express.Router();

router.post('/create', createActivity)
router.get('/', getActivities);
router.get('/:id', getActivity);

export default router;