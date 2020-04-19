'use strict'

const express = require('express')
const router = express.Router()
const qrController = require('../../controllers/code.controller')
// const validator = require('express-validation')
// const {create} = require('../../validations/user.validation')
const auth = require('../../middlewares/authorization')

// router.post('/register', validator(create), authController.register) // validate and register

// Authentication example
router.get('/test', auth(), (req, res) => {
  res.json({data: req})
})
router.post('/generate', auth(), qrController.generate)
router.get('', auth(), qrController.get)
router.put('/use/:code', auth(), qrController.use)

module.exports = router
