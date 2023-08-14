const mongoose = require('mongoose');

const detailedFrontendSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  information: {
    type: String,
    unique: true,
    required: true,
  },
  youtubeLink: {
    type: String,
    required: false,
  },
  documentationLink: {
    type: String,
    required: false,
  },
  articles: [
    {
      link: { type: String, required: true },
    },
  ],
  githubProjects: [
    {
      text: { type: String, required: false },
      link: { type: String, required: false },
    },
  ],
  questions: [
    {
      text: { type: String, required: true },
    },
  ],
  isRecommended: {
    type: Boolean,
    default: false,
  },
  checkbox: {
    type: Boolean,
    default: false,
  },
  
});

const detailedFrontendModel = mongoose.model('detailedFrontendModel', detailedFrontendSchema);

module.exports = detailedFrontendModel;
