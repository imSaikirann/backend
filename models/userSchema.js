// mongooseUser.js

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => {
        // Use a regex pattern to validate the email format
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value);
      },
      message: 'Invalid email format',
    },
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.signup = async function (email, password) {
  try {
    const exists = await this.findOne({ email });

    if (!email || !password) {
      throw new Error('All fields are required');
    }
    if (!validator.isStrongPassword(password)) {
      throw new Error('Password should consist of 8+ char, 1 special, 1 num, 1 uppercase, 1 lowercase  ');
    }
    if (exists) {
      throw new Error('Email is already in use');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ email, password: hash });
    return user;
  } catch (error) {
    throw error;
  }
};

userSchema.statics.login = async function (email, password) {
  try {
    const user = await this.findOne({ email });

    if (!email || !password) {
      throw new Error('All fields are required');
    }
   
  

    if (!user) {
      throw new Error('Email not found');
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new Error('Incorrect password');
    }

    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = mongoose.model('User', userSchema);
