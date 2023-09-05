const UserSchema = require('../models/userSchema');
const UserCheckboxData = require('../models/userCheckboxData');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

const UserLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserSchema.login(email, password);
    
        if (!user) {
            res.status(404).json({ message: 'Not found' });
        } else {
            const token = createToken(user._id);
            const userCheckData = await UserCheckboxData.findOne({ userId: user._id });
            res.status(200).json({ user, Data: userCheckData, token });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const UserSignin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const newUser = await UserSchema.signup(email, password);

        const token = createToken(newUser._id);

        const initialCheckboxData = await UserCheckboxData.create({
            userId: newUser._id,
            completedLanguages: []
        });

        res.status(200).json({ user: newUser, token, Data: initialCheckboxData });
    } catch (error) {
        res.status(500).json({ message: 'Signup error' });
    }
};

module.exports = { UserLogin, UserSignin };
