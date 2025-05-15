const express = require('express')
const routes = express.Router()
const {getDetails, createfine, getfines, getAnalysis, paymentApproval} = require('../controller/admin.controller')

routes.get("/getDetails",getDetails)
routes.get("/getfines",getfines)
routes.post("/getAnalysis",getAnalysis)
routes.post("/createfine",createfine)
routes.post("/paymentApproval",paymentApproval)


module.exports = routes;
