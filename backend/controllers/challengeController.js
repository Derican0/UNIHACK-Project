import '../models/Challenge.js';

/**
 * Get all challenges
 * @route GET /api/challenges
 * @access Public
 */
export const getChallenges = async (req, res) => {
  try {
    const challenges = await Challenge.find();
    res.json(challenges);
  } catch (error) {
    console.error('Error fetching challenges:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Get challenges by difficulty
 * @route GET /api/challenges/difficulty/:difficulty
 * @access Public
 */
export const getChallengesByDifficulty = async (req, res) => {
  try {
    const { difficulty } = req.params;
    
    if (!['easy', 'medium', 'hard'].includes(difficulty)) {
      return res.status(400).json({ message: 'Invalid difficulty level' });
    }
    
    const challenges = await Challenge.find({ difficulty });
    res.json(challenges);
  } catch (error) {
    console.error('Error fetching challenges by difficulty:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Get a single challenge
 * @route GET /api/challenges/:id
 * @access Public
 */
export const getChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);
    
    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }
    
    res.json(challenge);
  } catch (error) {
    console.error('Error fetching challenge:', error);
    
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Challenge not found' });
    }
    
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Create a new challenge
 * @route POST /api/challenges
 * @access Private (would require auth middleware in production)
 */
export const createChallenge = async (req, res) => {
  try {
    const { title, description, difficulty, verificationTags, points } = req.body;
    
    // Basic validation
    if (!title || !description || !difficulty || !verificationTags || !points) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    if (!['easy', 'medium', 'hard'].includes(difficulty)) {
      return res.status(400).json({ message: 'Difficulty must be easy, medium, or hard' });
    }
    
    const newChallenge = new Challenge({
      title,
      description,
      difficulty,
      verificationTags,
      points
    });
    
    const challenge = await newChallenge.save();
    res.status(201).json(challenge);
  } catch (error) {
    console.error('Error creating challenge:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Get a random challenge
 * @route GET /api/challenges/random/:difficulty?
 * @access Public
 */
export const getRandomChallenge = async (req, res) => {
  try {
    const { difficulty } = req.params;
    let query = {};
    
    if (difficulty) {
      if (!['easy', 'medium', 'hard'].includes(difficulty)) {
        return res.status(400).json({ message: 'Invalid difficulty level' });
      }
      query.difficulty = difficulty;
    }
    
    // Count documents matching the query
    const count = await Challenge.countDocuments(query);
    
    if (count === 0) {
      return res.status(404).json({ message: 'No challenges found' });
    }
    
    // Get a random number between 0 and count-1
    const random = Math.floor(Math.random() * count);
    
    // Skip to that random document
    const challenge = await Challenge.findOne(query).skip(random);
    
    res.json(challenge);
  } catch (error) {
    console.error('Error fetching random challenge:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
/**
 * Delete a challenge
 * @route DELETE /api/challenges/:id
 * @access Private (would require auth middleware in production)
 */
export const deleteChallenge = async (req, res) => {
    try {
      const challenge = await Challenge.findById(req.params.id);
      
      if (!challenge) {
        return res.status(404).json({ message: 'Challenge not found' });
      }
      
      await challenge.remove();
      res.json({ message: 'Challenge removed' });
    } catch (error) {
      console.error('Error deleting challenge:', error);
      
      if (error.kind === 'ObjectId') {
        return res.status(404).json({ message: 'Challenge not found' });
      }
      
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  /**
   * Update a challenge
   * @route PUT /api/challenges/:id
   * @access Private (would require auth middleware in production)
   */
  export const updateChallenge = async (req, res) => {
    try {
      const { title, description, difficulty, verificationTags, points } = req.body;
      
      // Build challenge object
      const challengeFields = {};
      if (title) challengeFields.title = title;
      if (description) challengeFields.description = description;
      if (difficulty) {
        if (!['easy', 'medium', 'hard'].includes(difficulty)) {
          return res.status(400).json({ message: 'Difficulty must be easy, medium, or hard' });
        }
        challengeFields.difficulty = difficulty;
      }
      if (verificationTags) challengeFields.verificationTags = verificationTags;
      if (points) challengeFields.points = points;
      
      let challenge = await Challenge.findById(req.params.id);
      
      if (!challenge) {
        return res.status(404).json({ message: 'Challenge not found' });
      }
      
      challenge = await Challenge.findByIdAndUpdate(
        req.params.id,
        { $set: challengeFields },
        { new: true }
      );
      
      res.json(challenge);
    } catch (error) {
      console.error('Error updating challenge:', error);
      
      if (error.kind === 'ObjectId') {
        return res.status(404).json({ message: 'Challenge not found' });
      }
      
      res.status(500).json({ message: 'Server error' });
    }
  };