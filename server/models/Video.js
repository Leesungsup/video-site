const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const moment = require("moment");
const { Schema } = require('mongoose');

const videoSchema = mongoose.Schema({
    writer:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    title:{
        type:String,
        maxlength:50
    },
    description:{
        type:String
    },
    privacy:{
        type:Number,
    },
    filePath:{
        type:String,
    },
    category:{
        type:String
    },
    views:{
        type:Number,
        default:0
    },
    duration:{
        type:String
    },
    thumbnail:{
        type:String
    }
},{timestamps:true})
const Video = mongoose.model('Video', videoSchema);

module.exports = { Video }