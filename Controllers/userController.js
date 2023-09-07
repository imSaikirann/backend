const User = require('../models/userSchema');
const UserCheckboxData = require('../models/userCheckboxData');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

const UserLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);

    const token = createToken(user._id);
    const userCheckData = await UserCheckboxData.findOne({ userId: user._id });

    res.status(200).json({ user, Data: userCheckData, token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const UserSignin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const newUser = await User.signup(email, password);

    const token = createToken(newUser._id);

    const initialCheckboxData = await UserCheckboxData.create({
      userId: newUser._id,
      completedLanguages: [],
    });

    res.status(201).json({ user: newUser, token, Data: initialCheckboxData });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { UserLogin, UserSignin };
