'use strict'

const express = require('express')
const router = express.Router()
const userController = require('../../controllers/service.controller')
const auth = require('../../middlewares/authorization')

router.get('/me', auth(), (req, res) => {
  res.json({data: req.user.transform()})
})
router.get('/:id', userController.get)
router.put('/update', auth(), userController.update)

module.exports = router
