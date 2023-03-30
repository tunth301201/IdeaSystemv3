const Tag = require('../models/Tag');

// Get all tags
const getTags = async (req, res) => {
    try {
      // Retrieve all tags from database
      const tags = await Tag.find();
  
      res.json(tags);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
// Create a new tag
const createTag = async (req, res) => {
    try {
      const {subject, description, start_dateOfTag, end_dateOfTag, end_dateOfIdea} = req.body;
      // Create new tag object
      const newTag = new Tag({
        subject,
        description,
        start_dateOfTag,
        end_dateOfTag,
        end_dateOfIdea,
      });
  
      // Save tag to database
      await newTag.save();
  
      res.status(201).json(newTag);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
// Delete a tag by ID
const deleteTag = async (req, res) => {
  try {
    // Check if user exists
    const existingTag = await Tag.findByIdAndDelete(req.params.id).exec();
    if (!existingTag) {
      return res.status(404).json({ message: 'Tag not found' });
    }
    res.json({ message: 'Tag deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
const getTag = async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id);

    res.json(tag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
// Update Tags
const updateTag = async (req, res) => {
  try {
    const { subject, description, start_dateOfTag, end_dateOfTag, end_dateOfIdea } = req.body;

    // Check if user exists
    const existingTag = await Tag.findByIdAndUpdate(req.params.id).exec();
    if (!existingTag) {
      return res.status(404).json({ message: 'Tag not found' });
    }

    // Update tags object
    existingTag.subject = subject;
    existingTag.description = description;
    existingTag.start_dateOfTag = start_dateOfTag;
    existingTag.end_dateOfTag = end_dateOfTag;
    existingTag.end_dateOfIdea = end_dateOfIdea;

    await existingTag.save();
    res.json(existingTag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports={
    getTags: getTags,
    createTag: createTag,
    deleteTag: deleteTag,
    updateTag: updateTag,
    getTag:getTag

}