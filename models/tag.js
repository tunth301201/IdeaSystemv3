const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: false,
    trim: true
  },
  description: {
    type: String,
    required: false,
    trim: true
  },
  start_dateOfTag: {
    type: Date,
    required: false,
  },
  end_dateOfTag: {
    type: Date,
    required: false,
  },
  end_dateOfIdea: {
    type: Date,
    required: false,
  },
}, { timestamps: true });

const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;