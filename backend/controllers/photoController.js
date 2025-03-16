// controllers/photoController.js
import User from '../models/User.js';
import { uploadFile } from '../services/storageService.js';

/**
 * Upload challenge completion photo
 * @route POST /api/photos/challenge/:userId/:challengeId
 * @access Private
 */
export const uploadChallengePhoto = async (req, res) => {
  try {
    // Check if file exists in request
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { userId, challengeId } = req.params;
    
    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Upload the file
    const photoUrl = await uploadFile(req.file);
    
    // Return the URL for the completeChallenge endpoint to use
    res.status(200).json({ 
      success: true, 
      photoUrl,
      message: 'Challenge photo uploaded successfully'
    });
  } catch (error) {
    console.error('Error in upload challenge photo:', error);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
};

export default {
  uploadChallengePhoto
};