const mongoose = require('mongoose')

const model = new mongoose.Schema({
    id:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        default: null
    }
})

module.exports = mongoose.model('Users',model)