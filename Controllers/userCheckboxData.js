
const UserCheckboxData = require('../models/userCheckboxData');

const updateUser = async (req, res) => {
    const { userId } = req.params;
    const { completedLanguages } = req.body;

    try {
        // Update the completedLanguages array for the user with the provided userId
        const updatedUser = await UserCheckboxData.findOneAndUpdate(
            { userId },
            { completedLanguages },
            { new: true } // Return the updated document
        );

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 


module.exports = { updateUser}