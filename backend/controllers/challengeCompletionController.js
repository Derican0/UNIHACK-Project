// controllers/challengeCompletionController.js
import User from '../models/User.js';
import Challenge from '../models/Challenge.js';
import { uploadFile } from '../services/storageService.js';

/**
 * Submit completed challenge with direct photo upload
 * @route POST /api/users/:id/complete-challenge
 * @access Private
 */
export const completeChallenge = async (req, res) => {
    try {
        const { challengeId } = req.body;
        
        if (!challengeId) {
            return res.status(400).json({ message: 'Challenge ID is required' });
        }
        
        // Check if file exists in request
        if (!req.file) {
            return res.status(400).json({ message: 'Challenge photo is required' });
        }
        
        // Find user
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // Find challenge
        const challenge = await Challenge.findById(challengeId);
        if (!challenge) {
            return res.status(404).json({ message: 'Challenge not found' });
        }
        
        // Upload the photo to Google Cloud Storage
        const photoUrl = await uploadFile(req.file);
        
        // Verify the image using Google Cloud Vision API
        // Note: This part would require setting up Vision API separately
        // For now, we'll assume it's verified
        const verificationResult = {
            verified: true,
            matchedTags: challenge.verificationTags,
            allDetectedLabels: challenge.verificationTags
        };
        
        // Create completed challenge record
        const completedChallenge = {
            challenge: challengeId,
            photoUrl,
            verified: verificationResult.verified,
            verificationTags: verificationResult.matchedTags,
            points: verificationResult.verified ? challenge.points : 0
        };
        
        // Add to user's completed challenges
        user.completedChallenges.push(completedChallenge);
        
        // Update total points if verified
        if (verificationResult.verified) {
            user.totalPoints += challenge.points;
        }
        
        // Clear daily challenge if it matches the completed one
        if (user.dailyChallenge && user.dailyChallenge.challenge && 
            user.dailyChallenge.challenge.toString() === challengeId) {
            user.dailyChallenge = null;
        }
        
        await user.save();
        
        res.json({
            success: true,
            verified: verificationResult.verified,
            points: verificationResult.verified ? challenge.points : 0,
            photoUrl,
            matchedTags: verificationResult.matchedTags,
            detectedLabels: verificationResult.allDetectedLabels
        });
    } catch (error) {
        console.error('Error completing challenge:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export default {
    completeChallenge
};