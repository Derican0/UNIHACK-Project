// routes/photoRoutes.js
import express from 'express';
const router = express.Router();
import upload from '../middleware/uploadMiddleware.js';
import { uploadChallengePhoto } from '../controllers/photoController.js';

// Upload challenge photo
router.post('/challenge/:userId/:challengeId', upload.single('photo'), uploadChallengePhoto);

export default router;