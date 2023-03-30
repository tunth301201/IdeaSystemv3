const Idea = require('../models/Idea');

// Get all ideas
const getIdeas = async (req, res) => {
    try {
        const ideas = await Idea.find();
        const ideasWithDocs = ideas.map(idea => {
            const documents = idea.documents.map(doc => ({
              fileId: doc.fileId,
              filename: doc.filename,
              contentType: doc.contentType
            }));
            
            return {
              ...idea.toObject(),
              documents
            };
          });
      
        res.json(ideasWithDocs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get one idea
const getOneIdea = async (req, res) => {
    try {
        const idea = await Idea.findById(req.params.id);

        // increate view time
        idea.view_time +=1;
        await idea.save();
        
        const documents = idea.documents.map(doc => ({
            fileId: doc.fileId,
            filename: doc.filename,
            contentType: doc.contentType
          }));

        const ideaWithDocs = {
            ...idea.toObject(),
            documents
          };
      
        res.json(ideaWithDocs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Create new idea
const createIdea = async (req, res) => {
    try {
        const { tag_id, title, content } = req.body;
        const documents = req.files.map(file => file.id);
        const user_id = req.params.id;

        const newIdea = new Idea({
            tag_id,
            user_id,
            title,
            content,
            documents,
        });

        await newIdea.save();

        res.status(201).json(newIdea);
    } catch (error){
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update idea
const updateIdea = async (req, res) => {
    try {
        const { tag_id, title, content } = req.body;
        const documents = req.files.map(file => file.id);

        // Check if idea exists
        const existingIdea = await Idea.findById(req.params.id);
        if (!existingIdea) {
            return res.status(404).json({ message: 'Idea not found' });
        }

        // Update idea object
        existingIdea.tag_id = tag_id;
        existingIdea.title = title;
        existingIdea.content = content;
        existingIdea.documents = documents;

        // Save updated idea to db
        await existingIdea.save();

        res.json(existingIdea);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete idea by ID
const deleteIdea = async (req, res) => {
    try {
        const existingIdea = await Idea.findByIdAndDelete(req.params.id);
        if (!existingIdea) {
            return res.status(404).json({ message: 'Idea not found' });
        }

        res.json({ message: 'Idea deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get Most Popular Ideas
const getMostPopularIdeas = async (req, res) => {

};

// Get Most Viewed Ideas
const getMostViewdIdeas = async (req,res) =>{

};

// Get Latest Ideas
const getLastestIdeas = async (req, res) => {

};

// Get total ideas of each department
const getTotalIdeasOfEachDepartment = async (req, res) => {

};

// Get percentage ideas of each department
const getPercentageIdeasOfEachDepartment = async (req, res) => {
    
}

module.exports={
    getIdeas: getIdeas,
    getOneIdea: getOneIdea,
    createIdea: createIdea,
    updateIdea: updateIdea,
    deleteIdea: deleteIdea,
    // getMostPopularIdeas: getMostPopularIdeas,
    // getMostViewdIdeas: getMostViewdIdeas,
    // getLastestIdeas: getLastestIdeas
}