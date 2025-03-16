// controllers/challengeCompletionController.js
import User from '../models/User.js';
import Challenge from '../models/Challenge.js';
import { uploadFile } from '../services/storageService.js';
import { verifyChallenge } from '../services/visionService.js';

/**
 * Submit completed challenge with direct photo upload
 * @route POST /api/users/:id/complete-challenge
 * @access Private
 */
export const completeChallenge = async (req, res) => {
    try {
        let { challengeId } = req.body;
        
        if (!challengeId) {
            return res.status(400).json({ message: 'Challenge ID is required' });
        }
        
        // Clean up the challengeId if it has extra quotes
        if (typeof challengeId === 'string') {
            challengeId = challengeId.replace(/^"+|"+$/g, '');
        }
        
        // Check if file exists in request
        if (!req.file) {
            return res.status(400).json({ message: 'Challenge photo is required' });
        }
        
        console.log('Processing challenge completion:', {
            userId: req.params.id,
            challengeId: challengeId,
            hasFile: !!req.file
        });
        
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
        console.log('Photo uploaded successfully:', photoUrl);
        
        // Verify the image using Google Cloud Vision API
        const verificationResult = await verifyChallenge(
            photoUrl, 
            challenge.verificationTags,
            1  // Require at least 1 matching tag
        );
        
        console.log('Verification result:', verificationResult);
        
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
            console.log(`Added ${challenge.points} points to user. New total: ${user.totalPoints}`);
        }
        
        // Clear daily challenge if it matches the completed one
        if (user.dailyChallenge && user.dailyChallenge.challenge && 
            user.dailyChallenge.challenge.toString() === challengeId) {
            user.dailyChallenge = null;
            console.log('Cleared daily challenge after completion');
        }
        
        await user.save();
        console.log('User updated with completed challenge');
        
        res.json({
            success: true,
            verified: verificationResult.verified,
            points: verificationResult.verified ? challenge.points : 0,
            photoUrl,
            matchedTags: verificationResult.matchedTags,
            detectedLabels: verificationResult.allDetectedLabels,
            verificationDetails: {
                minimumMatchThreshold: verificationResult.minimumMatchThreshold,
                matchesFound: verificationResult.matchesFound,
                matchedDetails: verificationResult.matchedDetails
            }
        });
    } catch (error) {
        console.error('Error completing challenge:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export default {
    completeChallenge
};