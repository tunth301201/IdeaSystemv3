const UserIdea = require('../models/userIdea');
const Idea = require('../models/idea');

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

            let ratedIdea = await Idea.findById(idea_id);
            ratedIdea.like = await UserIdea.count({rating: true});
            ratedIdea.dislike = await UserIdea.count({rating: false});
            await ratedIdea.save();

            await existingRating.save();
            res.status(200).json(existingRating);
        } else {
            // Otherwise, create a new rating record
            const newRating = new Rating({
                user_id,
                idea_id,
                rating,
            });

            let ratedIdea = await Idea.findById(idea_id);
            ratedIdea.like = await UserIdea.count({rating: true});
            ratedIdea.dislike = await UserIdea.count({rating: false});
            await ratedIdea.save();

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