// routes/userRoutes.js
import express from 'express';
const router = express.Router();
import upload from '../middleware/uploadMiddleware.js';

import {
  registerUser,
  getUserProfile,
  updateDeviceToken,
  getCompletedChallenges,
  getDailyChallenge
} from '../controllers/userController.js';

// Import the challenge completion controller
import { completeChallenge } from '../controllers/challengeCompletionController.js';

// Register user
router.post('/', registerUser);

// Get user profile
router.get('/:id', getUserProfile);

// Update device token
router.put('/:id/device-token', updateDeviceToken);

// Complete a challenge with photo upload
router.post('/:id/complete-challenge', upload.single('photo'), completeChallenge);

// Get completed challenges
router.get('/:id/completed-challenges', getCompletedChallenges);

// Get daily challenge
router.get('/:id/daily-challenge', getDailyChallenge);

export default router;