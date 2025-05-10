const mongoose = require('mongoose')
const model = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    branch: {
        type: String,
        required: true
    },
    section: {
        type: String,
        required: true,
        enum: ["A", "B", "C"]
    },
    fines: [{ type: String, default:[] }]
},{timestamps:true})

module.exports = mongoose.model('Student', model)