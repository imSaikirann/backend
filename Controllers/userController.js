const UserSchema = require('../models/userSchema');
const UserCheckboxData = require('../models/userCheckboxData');

const UserLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserSchema.findOne({ email });
        if (!user) {
            res.status(404).json({ message: 'Not found' });
        } else {
            const userCheckData = await UserCheckboxData.findOne({ userId: user._id });
            res.status(200).json({ user, Data: userCheckData });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const UserSignin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const exists = await UserSchema.findOne({ email });
        if (exists) {
            res.status(400).json({ message: 'User already exists' });
        } else {
            const newUser = await UserSchema.create({ email, password });
            await UserCheckboxData.create({
                userId: newUser._id,
                completedLanguages: [] // Replace 'html' with the correct value
            });
            res.status(200).json(newUser);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};






module.exports = { UserLogin, UserSignin };
