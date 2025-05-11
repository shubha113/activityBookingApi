import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { bookActivity, getMyBookings } from '../controllers/bookingController.js';

const router = express.Router();

router.use(protect);

router.post('/book', bookActivity);
router.get('/me', getMyBookings);

export default router;