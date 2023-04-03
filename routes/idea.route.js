const express = require('express');
const router = express.Router();
const ideaController = require('../controllers/idea.controller');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const { conn } = require('../config/db');
const middleware=require('./../helpers/middleware');

// UPLOAD file
let gfs;
conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

router.post('/upload', (req, res) => {
    try {
      const { file } = req;
  
      const writeStream = gfs.createWriteStream({
        filename: file.originalname
      });
  
      writeStream.on('close', file => {
        res.status(201).json({
          success: true,
          message: 'File uploaded successfully',
          file: {
            filename: file.filename,
            url: `/uploads/${file._id}`
          }
        });
      });
  
      writeStream.write(file.buffer);
      writeStream.end();
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Failed to upload file'
      });
    }
  });

// POST /ideas
router.post('/',middleware.auth, middleware.checkper("Staff"), ideaController.createIdea);

// GET /ideas
router.get('/',middleware.auth, middleware.checkper("Staff"), ideaController.getIdeas);

// GET /ideas/:id
router.get('/:id',middleware.auth, middleware.checkper("Staff"), ideaController.getOneIdea);

// PUT /ideas/:id
router.put('/:id',middleware.auth, middleware.checkper("Staff"), ideaController.updateIdea);

// DELETE /users/:id
router.delete('/:id',middleware.auth, middleware.checkper("Staff"), ideaController.deleteIdea);

module.exports = router;