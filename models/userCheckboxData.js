const mongoose = require('mongoose');

const userCheckboxSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserSchema' // Reference the UserSchema model
    },
    completedLanguages: [String],
    bcompletedLanguages: [String]


});

module.exports = mongoose.model('UserCheckboxData', userCheckboxSchema);
