const studentModel = require('../model/student.model')
const finesModel = require('../model/fines.model')
const mongoose = require('mongoose')


const getDetails = async (req, res) => {
    try {
        const data = await studentModel.find()
        res.status(200).json(data)
    } catch (err) {
        res.status(400).json("Internal Error")
    }
}

const createfine = async (req, res) => {
    const session = await mongoose.startSession();
    try {
        await session.startTransaction();
        const { details } = req.body;
        const due_date = new Date(details.due_date)
        const amount = Number(details.amount)
        const docs = await finesModel.find()
        await finesModel.create([{
            "id": docs.length + 1,
            "studentId": details.student_id,
            "category": details.fine_category,
            "amount": amount,
            "reason": details.reason,
            "due_date": due_date
        }])
        let std = await studentModel.findOne({ "id": details.student_id })
        let fines = std.fines || [];
        fines.push(docs.length + 1)
        await studentModel.updateOne({ "id": details.student_id }, { "fines": fines })
        await session.commitTransaction()
        res.status(200).json("success")
    } catch (err) {
        await session.abortTransaction();
        res.status(400).json("Internal Error")
        console.log(err)
    } finally {
        await session.endSession();
    }
}

const getfines = async (req, res) => {
    try {
        const docs = await finesModel.find();
        res.status(200).json(docs)
    } catch (err) {
        res.status(400).json("Internal Error")
    }
}

const getAnalysis = async (req, res) => {
    try {
        const { details } = req.body
        const docs = await finesModel.find();
        details.total_fines = docs.length
        docs.forEach(doc=>{
            const batchNo = doc.studentId.substring(0,2)
            const batch = details.batches.find(obj => String(obj.batch) === batchNo)
            batch.total_fines += 1
            batch.total_amount = String(Number(batch.total_amount) + doc.amount)
            if(doc.status === "paid"){
                details.total_collected += doc.amount
            } else {
                details.total_pending += 1
            }
        })

        details.batches.forEach(batch=>{
            if(batch.total_fines) details.total_batches += 1
        })
        res.status(200).json(details)
    } catch (err) {
        console.log(err)
        res.status(400).json("Internal Error")
    }
}



module.exports = { getDetails, createfine, getfines, getAnalysis }