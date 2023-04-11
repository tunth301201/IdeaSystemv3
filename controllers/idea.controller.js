const Idea = require('../models/Idea');
const mongoose = require('mongoose');
const { createReadStream } = require('fs');
const { Types } = mongoose;
const { ObjectId } = Types;


const Grid = require('gridfs-stream');
// const Grid = require('mongoose-gridfs')
const formidable = require('formidable');
const fs = require('fs');
const { MongoClient, ObjectID } = require('mongodb');




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
// const createIdea = async (req, res) => {
//     try {
//         const { tag_id, user_id, title, content } = req.body;
//         const files = req.files;
//         console.log("files: "+files)
//         if (!files) {
//             console.log("No files");
//             return res.status(400).json({ message: 'No files found in request' });
            
//         }

//         // const conn = mongoose.createConnection('mongodb+srv://group1940:19401940@cluster0.txsa0qr.mongodb.net/IdeaSystem?retryWrites=true&w=majority');
        
     
//         let gfs;
//         gfs = Grid(conn.db, mongoose.mongo);
//         gfs.collection('my_files');
          
//                 // Tạo Model GridFS
             

//                 let fileIds = []; // Mảng chứa _id của các file đã lưu

//                 const saveFileToGridFS = async (file) => {
//                     return new Promise((resolve, reject) => {
//                         // Tạo stream từ file
//                         // const fileStream = createReadStream(file.originalname);

//                         // Lưu file vào GridFS
//                         const writeStream = gfs.createWriteStream({
//                             filename: file.filename,
//                             metadata: {
//                                 tag_id: new ObjectId(tag_id),
//                                 user_id: new ObjectId(user_id),
//                                 content: content
//                             }
//                         });

//                         // fileStream.pipe(writeStream);

//                         writeStream.on('close', async (file) => {
//                             // Xoá file tạm trên disk
//                             fs.unlinkSync(file.path);

//                             // Lưu _id của file vào mảng fileIds
//                             fileIds.push(file._id);

//                             resolve();
//                         });

                     
//                     });
//                 };

//                 // Lưu các file vào GridFS
//                 await Promise.all(files.map(file => saveFileToGridFS(file)));

//                 console.log('file ids : '+fileIds)

//                 // Tạo idea mới trong MongoDB
//                 const newIdea = new Idea({
//                     tag_id: ObjectId(tag_id),
//                     user_id: ObjectId(user_id),
//                     title: title,
//                     content: content,
//                     documents: fileIds // Lưu mảng _id của các file trong Idea model
//                 });
//                 await newIdea.save();

//                 // Đóng kết nối MongoDB
//                 conn.close();

//                 res.status(201).json({
//                     message: 'Idea created successfully',
//                     idea: newIdea
//                 });

           
      
       


        

//     } catch (error){
//         console.error(error);
//         res.status(500).json({ message: 'Server error' });
//     }
// };

const createIdea = async (req, res) => {
    // Kết nối đến MongoDB Atlas
    mongoose.connect('mongodb+srv://group1940:19401940@cluster0.txsa0qr.mongodb.net/IdeaSystem?retryWrites=true&w=majority', { useNewUrlParser: true });

    var conn = mongoose.connection;
    // Tạo một luồng ghi dữ liệu vào GridFS
    var gfs = new Grid(conn.db, mongoose.mongo);

    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        if (err) {
          console.error('Lỗi khi xử lý form data:', err);
          res.status(500).json({ error: 'Lỗi khi xử lý form data' });
          return;
        }

        const fileArray = Object.values(files);
        console.log("lenght file array: "+fileArray.length)
        let fileIds = [];

        fileArray.forEach(file => {
            const writeStream = gfs.createWriteStream(file);
        });
       
      
       
    });
    
        
    


       
    

}

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