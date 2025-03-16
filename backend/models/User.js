// models/User.js
import mongoose from 'mongoose'
const { Schema, model } = mongoose;

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    completedChallenges: [{
        challenge: {
            type: Schema.Types.ObjectId,
            ref: 'Challenge'
        },
        completedAt: {
            type: Date,
            default: Date.now
        },
        photoUrl: String,
        verified: {
            type: Boolean,
            default: false
        },
        verificationTags: [String]
    }],
    dailyChallenge: {
        challenge: {
            type: Schema.Types.ObjectId,
            ref: 'Challenge'
        },
        assignedAt: {
            type: Date,
            default: Date.now
        }
    },
    deviceToken: String,
    totalPoints: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const User = model('User', UserSchema);
export default User;