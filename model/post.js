const mongoose = require('mongoose')
const connection = require('../connection/connection')

const postSchema = new mongoose.Schema({
    place_name : {
        type:String,
        trim: true,
    },
    country : {
        type: String,
        required:true,
        trim: true,
    },
    city : {
        type: String,
        required:true,
        trim: true,
    },
    radius : {
        type: Number,
        required:true,
        trim: true,
    },
    weather : {
        type: String,
        required: true,
        trim: true
    }
},
    {
        timestamps: true
    }
)

const model = mongoose.model('post',postSchema);

module.exports = model;