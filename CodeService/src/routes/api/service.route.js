'use strict'

const express = require('express')
const router = express.Router()
const qrController = require('../../controllers/code.controller')
const auth = require('../../middlewares/authorization')

router.post('/generate', auth(), qrController.generate)
router.get('', auth(), qrController.get)
router.get('/:code', auth(), qrController.get)
router.put('/use/:code', auth(), qrController.use)
router.post('/count', auth(), qrController.count)

module.exports = router
