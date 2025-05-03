const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
const port = 4000

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.connect('mongodb://localhost:27017/CollegeFines')
.then(()=>{
    console.log("MongoDb is connected");
})
.catch((err)=>{
    console.log("MongoDb Error",err);
})


app.listen(port,()=>{
    console.log('Server is running')
})