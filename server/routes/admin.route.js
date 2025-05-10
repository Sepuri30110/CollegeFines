const express = require('express')
const routes = express.Router()
const {getDetails} = require('../controller/admin.controller')

routes.get("/getDetails",getDetails)

module.exports = routes;
