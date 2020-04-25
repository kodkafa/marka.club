'use strict'

const express = require('express')
const router = express.Router()
const qrController = require('../../controllers/qr.controller')

router.use('', qrController.generate)

module.exports = router
