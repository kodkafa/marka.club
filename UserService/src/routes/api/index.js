'use strict'
const express = require('express')
const router = express.Router()
const serviceRouter = require('./service.route')

router.get('/status', (req, res) => { res.send({status: 'OK', message:'The User Service is healthy and up!'}) })
router.use('/users', serviceRouter)

module.exports = router
