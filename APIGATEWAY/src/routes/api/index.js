'use strict'
const config = require('../../config')
const express = require('express')
const proxy = require('express-http-proxy')
const router = express.Router()

router.get('/status', (req, res) => res.send({status: 'OK', message: `The ${config.service} is healthy and up!`}))

router.use('/auth', proxy(config.services.auth, {
  proxyReqPathResolver: (req) => {
    const service = config.services.auth;
    return `${service}${req.baseUrl}/${req.url.slice(1)}`
  }
}))

router.use('/users', proxy(config.services.user, {
  proxyReqPathResolver: (req) => {
    const service = config.services.user;
    return `${service}${req.baseUrl}/${req.url.slice(1)}`
  }
}))

router.use('/codes', proxy(config.services.code, {
  proxyReqPathResolver: (req) => {
    const service = config.services.code;
    return `${service}${req.baseUrl}/${req.url.slice(1)}`
  }
}))

router.use('/transactions', proxy(config.services.transaction, {
  proxyReqPathResolver: (req) => {
    const service = config.services.transaction;
    return `${service}${req.baseUrl}/${req.url.slice(1)}`
  }
}))

router.use('/qr', proxy(config.services.qr, {
  proxyReqPathResolver: (req) => {
    const service = config.services.qr;
    return `${service}${req.baseUrl}/${req.url.slice(1)}`
  }
}))

module.exports = router
