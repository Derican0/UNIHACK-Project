// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import usersRoutes from './routes/userRoutes.js';
import challengesRoutes from './routes/challengeRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define routes
app.use('/api/users', usersRoutes);
app.use('/api/challenges', challengesRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Seed data
import Challenge from './models/Challenge.js';
import connectDB from './config/database.js';

// Sample challenges data
const challenges = [
  {
    title: 'Identify a Bird',
    description: 'Find and take a photo of a wild bird in its natural habitat.',
    difficulty: 'easy',
    points: 10
  },
  {
    title: 'Mountain View',
    description: 'Hike to a viewpoint and capture a scenic mountain panorama.',
    difficulty: 'medium',
    points: 20
  },
  {
    title: 'Water Reflection',
    description: 'Find a calm body of water and capture a perfect reflection.',
    difficulty: 'easy',
    points: 15
  },
  {
    title: 'Night Sky',
    description: 'Go outside after dark and photograph the night sky with visible stars.',
    difficulty: 'hard',
    points: 30
  },
  {
    title: 'Forest Fungi',
    description: 'Locate and photograph an interesting mushroom or fungi.',
    difficulty: 'medium',
    points: 20
  },
  {
    title: 'Sunset Colors',
    description: 'Capture a sunset with vibrant colors.',
    difficulty: 'easy',
    points: 10
  },
  {
    title: 'Insect Close-up',
    description: 'Take a detailed close-up photo of an insect.',
    difficulty: 'medium',
    points: 20
  },
  {
    title: 'Wild Flower',
    description: 'Find and photograph a wildflower in bloom.',
    difficulty: 'easy',
    points: 10
  },
  {
    title: 'Waterfall Adventure',
    description: 'Find a waterfall and capture its beauty.',
    difficulty: 'hard',
    points: 30
  },
  {
    title: 'Tree Canopy',
    description: 'Look up and capture the canopy of trees from below.',
    difficulty: 'easy',
    points: 15
  }
];

// Seed the database
const importData = async () => {
  try {
    await connectDB();
    
    // Delete existing challenges
    await Challenge.deleteMany();
    
    // Insert new challenges
    await Challenge.insertMany(challenges);
    
    console.log('Data imported successfully!');

    // print challenges to console
    console.log('Challenges:');
    for (const challenge of challenges) {
      console.log(challenge);
    }
    process.exit();
  } catch (error) {
    console.error(`Error importing data: ${error}`);
    process.exit(1);
  }
};

importData();