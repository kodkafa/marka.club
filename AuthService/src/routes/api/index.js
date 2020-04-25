'use strict'
const config = require('../../config')
const express = require('express')
const router = express.Router()

const authRouter = require('./auth.route')

router.get('/status', (req, res) => res.send({status: 'OK', message: `The ${config.service} is healthy and up!`}))

router.use('/auth', authRouter)

module.exports = router
