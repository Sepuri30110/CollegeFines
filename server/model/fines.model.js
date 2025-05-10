const mongoose = require('mongoose');

const model = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    studentId: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ["late", "informal", "other"],
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    reason: {
        type: String,
        default: null
    },
    txnId: {
        type: String,
        default: null
    },
    status: {
        type: String,
        enum: ["paid", "pending", "pending_approval"],
        default: "pending"
    },
    issue_date: {
        type: Date,
        required: true
    },
    due_date: {
        type: Date,
        required: true
    }
},{timestamps:true})

module.exports = mongoose.model('Fines', model)