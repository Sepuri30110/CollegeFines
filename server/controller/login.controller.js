const users = require('../model/users.model')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
    const { uname, password } = req.body.details
    const user = await users.findOne({ "id": uname })
    if (user) {
        if (password === user.password) {

            jwt.sign({user},"secret",(err, token)=>{
                if(err){
                    res.status(400).json("Unable to create Token")
                } else {
                    res.status(200).json({status:"success",token})
                }
            })
        } else {
            res.status(400).json("Invaild Password")
        }
    } else{
        res.status(400).json("Invalid Uname")
    }
}

module.exports = { login }