const mongoose = require('mongoose');

const detailedFrontendSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  information: {
    type: String,
    unique: false,
    required: false,
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
      text: { type: String, required: false},
      link: { type: String, required: false },
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
  topics: [
    {
      topicName: {
        type: String,
        required: false,
      },
      information: { 
        type: String,
        required: false,
      },
      article: {
        text: { type: String, required: false },
        link: { type: String, required: false },
      },
      youtubeLink: {
        type: String,
        required: false,
      },
    },
  ],
});

const detailedFrontendModel = mongoose.model('detailedFrontendModel', detailedFrontendSchema);

module.exports = detailedFrontendModel;

