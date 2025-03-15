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
    }]
}, { timestamps: true });

const User = model('User', UserSchema);
export default User;