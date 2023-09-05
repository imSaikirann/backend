const backendModel = require('../models/backendModel');

const postData = async (req, res) => {
  const { name, information, youtubeLink, documentationLink, questions, articles, githubProjects ,topics,frameworks} = req.body;
  try {
    const newData = await backendModel.create({ name, information, youtubeLink, documentationLink, questions, articles, githubProjects ,topics,frameworks });
    res.status(200).json(newData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getData = async (req, res) => { 
  try {
    const allData = await backendModel.find();
    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json(allData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteData = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedData = await backendModel.findByIdAndDelete(id);
    if (!deletedData) {
      return res.status(404).json({ error: 'Data not found or already deleted.' });
    }
    res.status(200).json(deletedData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const updateData = async (req, res) => {
  const { id } = req.params;
  
  try {
    const data = await backendModel.findByIdAndUpdate({_id:id},{
      ...req.body
    })

    if (!data) {
      return res.status(404).json({ error: 'Data not found.' });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  postData,
  getData,
  deleteData,
  updateData
};
