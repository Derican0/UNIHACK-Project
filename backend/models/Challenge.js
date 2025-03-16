// models/Challenge.js
import mongoose from 'mongoose'
const { Schema, model } = mongoose;

const ChallengeSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    required: true
  },
  verificationTags: {
    type: [String],
    default: []
  },
  points: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

const Challenge = model('Challenge', ChallengeSchema);
export default Challenge;