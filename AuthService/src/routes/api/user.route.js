'use strict'

const express = require('express')
//const proxy = require('express-http-proxy')

const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer();
const {createProxyMiddleware} = require('http-proxy-middleware');
const router = express.Router()
const authController = require('../../controllers/auth.controller')
const validator = require('express-validation')
const {create} = require('../../validations/user.validation')
const auth = require('../../middlewares/authorization')

// router.post('/register', validator(create), authController.register) // validate and register
// router.post('/login', authController.login) // login
// router.put('/confirm', authController.confirm)

router.get('/', (req, res) => {
  res.send({status: 'OK', message: `http://localhost:4002${req.baseUrl}${req.url.slice(1)}`})
}) // api status
// router.use('/test', proxy('http://localhost:4002', {
//   proxyReqOptDecorator: (proxyReq) => {
//     return proxyReq;
//   },
//
//   proxyReqPathResolver: (req) => {
//     return `http://localhost:4002${req.baseUrl}${req.url.slice(1)}`;
//   },
//
//   // userResDecorator: (rsp, data, req, res) => {
//   //   res.set('Access-Control-Allow-Origin', req.headers.origin);
//   //   return data.toString('utf-8');
//   // }
// }));

// router.get('/account', auth(), (req, res) => {
//   proxy.web(req, res, {
//     target: 'http://localhost:4002',
//     xfwd:true,
//     changeOrigin: true,
//     toProxy: true,
//     prependPath:true
//   })
// });
router.get('/account', createProxyMiddleware({target: 'http://localhost:4002', changeOrigin: true}))
router.put('/update', createProxyMiddleware({target: 'http://localhost:4002', changeOrigin: true}))
//router.put('/update', auth(), authController.update)

// router.get('/is-user', auth(['user']), (req, res) => {
//   res.json({message: 'True'})
// })
// router.get('/is-admin', auth(['admin']), (req, res) => {
//   res.json({message: 'True'})
// })

module.exports = router
