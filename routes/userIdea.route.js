const express = require('express');
const router = express.Router();
const userIdeaController = require('../controllers/userIdea.controller');

// PUT /userIdeas
router.put('/:id', userIdeaController.updateRating);

module.exports = router;