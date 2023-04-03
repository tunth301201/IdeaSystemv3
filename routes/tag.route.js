const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tag.controller');
const middleware=require('./../helpers/middleware');
// POST /tags
router.route('/')
.post(middleware.auth,middleware.checkper("QA Manager"),tagController.createTag)
// GET /tags
.get(middleware.auth,middleware.checkper("QA Manager"),tagController.getTags)
// GET /tag
router.route('/:id')
.get(middleware.auth,middleware.checkper("QA Manager"),tagController.getTag)
// GET /delete tag
.delete(middleware.auth,middleware.checkper("QA Manager"),tagController.deleteTag)
// GET /Edit tag
.put(middleware.auth,middleware.checkper("QA Manager"),tagController.updateTag)
module.exports = router;