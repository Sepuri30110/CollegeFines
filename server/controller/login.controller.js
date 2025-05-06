const users = require('../model/users.model')

const login = async (req, res) => {
    const { uname, password } = req.body.details
    const user = await users.findOne({ "id": uname })
    if (user) {
        if (password === user.password) {
            res.status(200).json("success")
        } else {
            res.status(400).json("Invaild Password")
        }
    } else{
        res.status(400).json("Invalid Uname")
    }
}

module.exports = { login }