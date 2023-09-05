const mongoose = require('mongoose');

const devToolsSchema = new mongoose.Schema({
    toolname: {
        type: String,
        required: true,
    },
    image:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    information:{
        type:String,
        required:true,
    },
    link:{
        type:String,
        required:true,
    }
});

module.exports = mongoose.model('devtoolsschema', devToolsSchema);
