const express = require('express');
const router = express.Router();
const ideaController = require('../controllers/idea.controller');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const { conn } = require('../config/db');
const middleware=require('./../helpers/middleware');
const multer = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');
const crypto = require('crypto');
const path = require('path');
const upload = require("../helpers/upload");

// UPLOAD file
// let gfs;
// conn.once('open', () => {
//   gfs = Grid(conn.db, mongoose.mongo);
//   gfs.collection('uploads');
// });

// const storage = new GridFsStorage({
//   url: 'mongodb+srv://group1940:19401940@cluster0.txsa0qr.mongodb.net/IdeaSystem?retryWrites=true&w=majority',
//   file: (req, file) => {
//     return new Promise((resolve, reject) => {
//       crypto.randomBytes(16, (error, buf) => {
//         if (error) {
//           return reject(error);
//         }

//         const filename = buf.toString('hex') + path.extname(file.originalname);
//         const fileInfo = {
//           filename: filename,
//           bucketName: 'uploads',
//         };
//         resolve(fileInfo);
//       });
//     });
//   },
// });

// const upload = multer({ storage });

// router.post('/upload', (req, res) => {
//     try {
//       const { file } = req;
  
//       const writeStream = gfs.createWriteStream({
//         filename: file.originalname
//       });
  
//       writeStream.on('close', file => {
//         res.status(201).json({
//           success: true,
//           message: 'File uploaded successfully',
//           file: {
//             filename: file.filename,
//             url: `/uploads/${file._id}`
//           }
//         });
//       });
  
//       writeStream.write(file.buffer);
//       writeStream.end();
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({
//         success: false,
//         message: 'Failed to upload file'
//       });
//     }
//   });

// POST /ideas


router.post('/', ideaController.createIdea);

// GET /ideas
router.get('/',ideaController.getIdeas);

// GET /ideas/:id
router.get('/:id', ideaController.getOneIdea);

// PUT /ideas/:id
router.put('/:id', ideaController.updateIdea);

// DELETE /users/:id
router.delete('/:id', ideaController.deleteIdea);

module.exports = router;