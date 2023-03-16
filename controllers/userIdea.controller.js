const UserIdea = require('../models/userIdea');

// Update rating
const updateRating = async (req, res) => {
    try {
        const { idea_id, rating } = req.body;
        const user_id = req.params.id;

        // Find the existing rating record for the user and idea
        let existingRating = await UserIdea.findOne({ user_id: user_id, idea_id: idea_id });

        // If the rating record exists, update the rating
        if (existingRating) {
        existingRating.rating = rating;
        await existingRating.save();
        res.status(200).json(existingRating);
        } else {
        // Otherwise, create a new rating record
        const newRating = new Rating({
            user_id,
            idea_id,
            rating,
        });
        await newRating.save();
        res.status(201).json(newRating);
        }
    
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports={
    updateRating: updateRating
}