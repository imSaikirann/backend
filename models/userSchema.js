const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    email: {
        type: String
    },
    password: {
        type: String
    }
});
// static signup method
userSchema.statics.signup = async function (email, password) {
    const exists = await this.findOne({ email });

    if (exists) {
        throw Error('Email is already used');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ email, password: hash });
    return user;
};

// user login
userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });

    if (!user) {
        throw Error('Email not found');
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw Error('Incorrect password');
    }
    
    return user;
};

module.exports = mongoose.model('UserSchema', userSchema);
