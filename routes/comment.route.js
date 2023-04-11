const express = require('express');
const router = express.Router();
const commentcontroller = require('../controllers/comment.controller');
const middleware=require('./../helpers/middleware');
// GET /tags
router.get('/', commentcontroller.getComment);
//Create comment
router.post('/:idea_id/comments/', commentcontroller.createComment);
//Create reply comment
router.put('/:comment_id/reply', commentcontroller.replyComment);
//Create reply comment
router.put('/:comment_id/:replycommentId', commentcontroller.editreplyComment);
//Delete comment
router.delete('/:comment_id/', commentcontroller.deleteComment);
//Delete reply comment
router.delete('/:comment_id/:replycommentId', commentcontroller.deletereplyComment);
//Edit Comment
router.put('/:comment_id/', commentcontroller.updateComment);
module.exports = router;