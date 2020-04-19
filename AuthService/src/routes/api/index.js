'use strict'
const express = require('express')
const proxy = require('express-http-proxy')
const router = express.Router()

const authRouter = require('./auth.route')
// const usersRouter = require('./user.route')

router.get('/status', (req, res) => {
  res.send({status: 'OK', message:'The API is healthy and up!'})
})

router.use('/auth', authRouter)

router.use('/users', proxy('http://localhost:4002', {
  proxyReqPathResolver: (req) => {
    return `http://localhost:4002${req.baseUrl}/${req.url.slice(1)}`;
  }
}))

router.use('/codes', proxy('http://localhost:4004', {
  proxyReqPathResolver: (req) => {
    return `http://localhost:4004${req.baseUrl}/${req.url.slice(1)}`;
  }
}))

router.use('/transactions', proxy('http://localhost:4006', {
  proxyReqPathResolver: (req) => {
    return `http://localhost:4006${req.baseUrl}/${req.url.slice(1)}`;
  }
}))

router.use('/qr', proxy('http://localhost:4008', {
  proxyReqPathResolver: (req) => {
    return `http://localhost:4008${req.baseUrl}/${req.url.slice(1)}`;
  }
}))

module.exports = router
