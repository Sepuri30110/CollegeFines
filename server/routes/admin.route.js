const express = require('express')
const routes = express.Router()
const {getDetails, createfine, getfines} = require('../controller/admin.controller')

routes.get("/getDetails",getDetails)
routes.get("/getfines",getfines)
routes.post("/createfine",createfine)


module.exports = routes;
