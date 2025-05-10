const studentModel = require('../model/student.model')

const getDetails = async(req, res) =>{
    try{
        const data = await studentModel.find()
        res.status(200).json(data)
    } catch(err){
        res.status(400).json("Internal Error")
    }
}

module.exports = {getDetails}