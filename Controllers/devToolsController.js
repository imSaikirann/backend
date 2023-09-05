const devToolsData = require('../models/devToolsModel');

const postTools = async (req, res) => {
  const { toolname, information, link ,image} = req.body;
  try {
    const newData = await devToolsData.create({ toolname, information, link ,image});
    res.status(200).json(newData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const getTools = async (req, res) => {
  try {
    // Retrieve all tools from the database
    const tools = await devToolsData.find();

    res.status(200).json(tools);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
const deleteTool = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTool = await devToolsData.findByIdAndDelete(id);
    if (!deletedTool) {
      return res.status(404).json({ error: 'Data not found or already deleted.' });
    }
    res.status(200).json(deletedTool);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { postTools, getTools ,deleteTool};
