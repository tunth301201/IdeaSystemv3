const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    trim: true
  },
  isAnonymity: {
    type: Boolean,
    default: false,
  },
  comment: {
    type: String,
    required: true,
  },
  idea_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Idea'
  },
  reply: [{
    user_id:{
      type: mongoose.Schema.Types.ObjectId,
      ref:'User',
      required: true,
    },
    replycomment:{
      type: String,
      required: true,
    },
    isAnonymityReply:{
      type: Boolean,
      required: true,
      default: false,
    }
}]
  
}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;