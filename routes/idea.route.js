const express = require('express');
const router = express.Router();
const ideaController = require('../controllers/idea.controller');
const Idea = require('../models/Idea');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const multer = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage'); 
const crypto = require('crypto');
const path = require('path');
const conn = mongoose.connection;
const methodOverride = require('method-override');

// Khởi tạo GridFS
let gfs;
conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads'); // Tên của collection lưu trữ files
   
});

// Cấu hình multer storage engine
const storage = new GridFsStorage({
  url: "mongodb+srv://group1940:19401940@cluster0.txsa0qr.mongodb.net/IdeaSystem?retryWrites=true&w=majority", // Đường dẫn tới MongoDB Atlas
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        // const filename = buf.toString('hex') + path.extname(file.originalname);
        const filename = file.originalname;
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads' // Tên của collection lưu trữ files
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });


// Xử lý request POST /ideas
router.post('/', upload.array('files'), async (req, res) => {
    try {
        const { tag_id, user_id, title, content, isAnonymity } = req.body;
        const fileIds = req.files.map(file => file.id);
    
        const newIdea = new Idea({
          tag_id: tag_id,
          user_id: user_id,
          title: title,
          content: content,
          isAnonymity: isAnonymity,
          fileIds: fileIds
        });
    
        await newIdea.save();
        res.status(200).json({ message: 'Idea saved successfully' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    
  });


// GET /ideas
router.get('/',ideaController.getIdeas);

router.get('/profile/:id', ideaController.getIdeasByUserID);

router.get('/getMostPopularIdeas',ideaController.getMostPopularIdeas);

router.get('/getMostViewIdeas',ideaController.getMostViewIdeas);

router.get('/getLastIdeas',ideaController.getLastestIdeas);

// GET /ideas/:id
router.get('/:id', async (req, res) => {
  const idea = await Idea.findById(req.params.id).populate('user_id', 'fullname').populate('tag_id', 'subject');

  // increate view time
  idea.view_time +=1;
  await idea.save();

  const fileIds = idea.fileIds;

  const files = await Promise.all(
    fileIds.map(async (fileId) => {
      const file = await gfs.files.find({ _id: fileId }).toArray();
      return file[0]; // Assuming fileIDs are unique, so we expect only one file for each ID
    })
  );

  const ideaDetail = {
    _id: idea._id,
    title: idea.title,
    tag_name: idea.tag_id.subject,
    content: getShortContent(idea.content),
    createdAt: formatDateTimeDislay(idea.createdAt),
    user_id: idea.user_id._id, // Lấy _id của user từ User Model
    user_name: idea.user_id.fullname, // Lấy user_name từ User Model
    files: files,
    like: idea.like,
    dislike: idea.dislike,
  };

  res.json (ideaDetail);

    
});
function getShortContent(text) {
  var maxLength = Math.ceil(text.length * 2 / 3);
  var truncatedText = text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  return truncatedText;
}
function formatDateTimeDislay(inputString) {
  // Convert input string to JavaScript Date object
  var date = new Date(inputString);

  // Extract individual components (year, month, day, hours, minutes, seconds) from the Date object
  var year = date.getFullYear();
  var month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are zero-indexed, so we add 1 and pad with leading zero
  var day = ("0" + date.getDate()).slice(-2); // Pad with leading zero
  var hours = ("0" + date.getHours()).slice(-2); // Pad with leading zero
  var minutes = ("0" + date.getMinutes()).slice(-2); // Pad with leading zero
  var seconds = ("0" + date.getSeconds()).slice(-2); // Pad with leading zero

  // Format the date and time components into a user-friendly string
  var formattedDateTime = day + "/" + month + "/" + year + " " + hours + ":" + minutes + ":" + seconds;

  // Return the formatted date and time string
  return formattedDateTime;
}

// PUT /ideas/:id
router.put('/:id', ideaController.updateIdea);

// DELETE /users/:id
router.delete('/:id', ideaController.deleteIdea);

module.exports = router;