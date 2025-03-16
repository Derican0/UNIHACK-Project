import express from 'express';
const router = express.Router();
import '../controllers/userController.js';

import {
  registerUser,
  getUserProfile,
  updateDeviceToken,
  completeChallenge,
  getCompletedChallenges,
  getDailyChallenge
} from '../controllers/userController.js';

// Register user
router.post('/', registerUser);

// Get user profile
router.get('/:id', getUserProfile);

// Update device token
router.put('/:id/device-token', updateDeviceToken);

// Complete a challenge
router.post('/:id/complete-challenge', completeChallenge);

// Get completed challenges
router.get('/:id/completed-challenges', getCompletedChallenges);

// Get daily challenge
router.get('/:id/daily-challenge', getDailyChallenge);

const userRoutes = router;
export default userRoutes;