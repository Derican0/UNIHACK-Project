import User from '../models/User.js';
import Challenge from '../models/Challenge.js';
// import visionService from '../services/visionService.js';

/**
 * Register a new user
 * @route POST /api/users
 * @access Public
 */
export const registerUser = async (req, res) => {
    try {
        const { name, email, deviceToken } = req.body;
        
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }
        
        // Create new user
        user = new User({
            name,
            email,
            deviceToken
        });
        
        await user.save();
        
        res.status(201).json({
            success: true,
            data: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

/**
 * Get user profile
 * @route GET /api/users/:id
 * @access Private (would require auth middleware in production)
 */
export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .select('-__v')
            .populate('dailyChallenge.challenge')
            .populate('completedChallenges.challenge');
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.json(user);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.status(500).json({ message: 'Server error' });
    }
};

/**
 * Update device token
 * @route PUT /api/users/:id/device-token
 * @access Private (would require auth middleware in production)
 */
export const updateDeviceToken = async (req, res) => {
    try {
        const { deviceToken } = req.body;
        
        if (!deviceToken) {
            return res.status(400).json({ message: 'Device token is required' });
        }
        
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { deviceToken },
            { new: true }
        );
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.json({ message: 'Device token updated', success: true });
    } catch (error) {
        console.error('Error updating device token:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

/**
 * Submit completed challenge
 * @route POST /api/users/:id/complete-challenge
 * @access Private (would require auth middleware in production)
 */
export const completeChallenge = async (req, res) => {
    try {
        const { challengeId, photoUrl } = req.body;
        
        if (!challengeId || !photoUrl) {
            return res.status(400).json({ message: 'Challenge ID and photo URL are required' });
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
        
        // Verify the image using Google Cloud Vision API
        // ***************************************************************
        // const verificationResult = await visionService.verifyChallenge(photoUrl, challenge.verificationTags);
        
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
        if (user.dailyChallenge && user.dailyChallenge.challenge.toString() === challengeId) {
            user.dailyChallenge = null;
        }
        
        await user.save();
        
        res.json({
            success: true,
            verified: verificationResult.verified,
            points: verificationResult.verified ? challenge.points : 0,
            matchedTags: verificationResult.matchedTags,
            detectedLabels: verificationResult.allDetectedLabels
        });
    } catch (error) {
        console.error('Error completing challenge:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

/**
 * Get user's completed challenges
 * @route GET /api/users/:id/completed-challenges
 * @access Private (would require auth middleware in production)
 */
export const getCompletedChallenges = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .select('completedChallenges')
            .populate('completedChallenges.challenge');
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.json(user.completedChallenges);
    } catch (error) {
        console.error('Error fetching completed challenges:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

/**
 * Get user's daily challenge
 * @route GET /api/users/:id/daily-challenge
 * @access Private (would require auth middleware in production)
 */
export const getDailyChallenge = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .select('dailyChallenge')
            .populate('dailyChallenge.challenge');
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        if (!user.dailyChallenge || !user.dailyChallenge.challenge) {
            return res.status(404).json({ message: 'No daily challenge assigned' });
        }
        
        res.json(user.dailyChallenge);
    } catch (error) {
        console.error('Error fetching daily challenge:', error);
        res.status(500).json({ message: 'Server error' });
    }
};