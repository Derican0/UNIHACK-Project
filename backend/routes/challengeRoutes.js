import express from 'express';
const router = express.Router();
import '../controllers/userController.js';

import {
  getChallenges,
  getChallenge,
  createChallenge,
  updateChallenge,
  deleteChallenge,
  getChallengesByDifficulty,
  getRandomChallenge
} from '../controllers/challengeController.js';

// Get all challenges
router.get('/', getChallenges);

// Get challenges by difficulty
router.get('/difficulty/:difficulty', getChallengesByDifficulty);

// Get a random challenge
router.get('/random', getRandomChallenge);
router.get('/random/:difficulty', getRandomChallenge);

// Get, update, delete challenge by ID
router.get('/:id', getChallenge);
router.post('/', createChallenge);
router.put('/:id', updateChallenge);
router.delete('/:id', deleteChallenge);

const challengeRoutes = router;
export default challengeRoutes;
