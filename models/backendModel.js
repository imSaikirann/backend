const mongoose = require('mongoose');

const backendRoadmapSchema = new mongoose.Schema({
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
      text:{type:String,required:true},
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
  frameworks: {
    type: [
      {
        name: String,
        information: String,
        youtubeLink: String,
        articles: [
          {
            text: { type: String },
            link: { type: String },
          },
        ],
      },
    ],
    required: false,
  },
});

const backendRoadmapModel = mongoose.model('backendRoadmapModel', backendRoadmapSchema);

module.exports = backendRoadmapModel;
