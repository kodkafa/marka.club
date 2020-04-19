'use strict'

const express = require('express')
const router = express.Router()
const authController = require('../../controllers/auth.controller')
const validator = require('express-validation')
const {create} = require('../../validations/user.validation')
const auth = require('../../middlewares/authorization')

router.post('/register', validator(create), authController.register) // validate and register
router.post('/login', authController.login) // login
router.put('/confirm', authController.confirm)

// // Authentication example
// router.get('/account', auth(), (req, res) => {
//   res.json({data: req.user.transform()})
// })
// router.put('/update', auth(), authController.update)
//
// router.get('/is-user', auth(['user']), (req, res) => {
//   res.json({message: 'True'})
// })
// router.get('/is-admin', auth(['admin']), (req, res) => {
//   res.json({message: 'True'})
// })

module.exports = router
