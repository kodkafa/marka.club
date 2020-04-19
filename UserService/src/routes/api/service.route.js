'use strict'

const express = require('express')
const router = express.Router()
const authController = require('../../controllers/service.controller')
const validator = require('express-validation')
const {create} = require('../../validations/user.validation')
const auth = require('../../middlewares/authorization')

// router.post('/register', validator(create), authController.register) // validate and register

// Authentication example
router.get('/test', auth(), (req, res) => {
  res.json({data: req})
})
router.get('/me', auth(), (req, res) => {
  res.json({data: req.user.transform()})
})
router.put('/update', auth(), authController.update)

module.exports = router
