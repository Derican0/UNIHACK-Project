// routes/challengeRoutes.js
import express from 'express';
const router = express.Router();

// Import from controller
import challengeController from '../controllers/challengeController.js';

// Get all challenges
router.get('/', challengeController.getChallenges);

// Get challenges by difficulty
router.get('/difficulty/:difficulty', challengeController.getChallengesByDifficulty);

// Get a random challenge
router.get('/random', challengeController.getRandomChallenge);
router.get('/random/:difficulty', challengeController.getRandomChallenge);

// Create a new challenge
router.post('/', challengeController.createChallenge);

// Get challenge by ID
router.get('/:id', challengeController.getChallenge);

export default router;