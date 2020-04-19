'use strict'

const express = require('express')
const router = express.Router()
const transactionController = require('../../controllers/transaction.controller')
const auth = require('../../middlewares/authorization')

router.get('/test', auth(), (req, res) => {
  res.json({data: req})
})

router.post('', auth(), transactionController.create)
router.get('/check', auth(), transactionController.check)

module.exports = router
