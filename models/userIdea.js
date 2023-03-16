const mongoose = require('mongoose');

const userIdeaSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    idea_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Idea',
        required: true
    },
    rating: {
        type: Boolean,
    },
}, { timestamps: true });

const UserIdea = mongoose.model('UserIdea', userIdeaSchema);

module.exports = UserIdea;