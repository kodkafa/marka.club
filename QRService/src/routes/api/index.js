'use strict'
const config = require('../../config')
const express = require('express')
const router = express.Router()
const serviceRouter = require('./service.route')

router.get('/status', (req, res) => res.send({status: 'OK', message: `The ${config.service} is healthy and up!`}))
router.use('/qr', serviceRouter)

module.exports = router
