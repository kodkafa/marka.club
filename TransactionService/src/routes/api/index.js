'use strict'
const express = require('express')
const router = express.Router()
const serviceRouter = require('./service.route')

router.get('/status', (req, res) => { res.send({status: 'OK', message:'The Transaction Service is healthy and up!'}) })
router.use('/transactions', serviceRouter)

module.exports = router
