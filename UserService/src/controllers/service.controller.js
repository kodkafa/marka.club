'use strict'

const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const config = require('../config')
const httpStatus = require('http-status')
const uuidv1 = require('uuid/v1')

exports.register = async (req, res, next) => {
  try {
    const activationKey = uuidv1()
    const body = req.body
    body.activationKey = activationKey
    if (!config.activation)
      body.active = true;
    const user = new User(body)
    const savedUser = await user.save()
    res.status(httpStatus.CREATED)
    res.send(savedUser.transform())
  } catch (error) {
    console.log({error})
    return next(User.checkDuplicateEmailError(error))
  }
}

exports.login = async (req, res, next) => {
  try {
    const user = await User.findAndGenerateToken(req.body)
    const payload = {sub: user.id}
    const token = jwt.sign(payload, config.secret)
    return res.json({message: 'OK', token: token})
  } catch (error) {
    next(error)
  }
}

exports.confirm = async (req, res, next) => {
  try {
    await User.findOneAndUpdate(
      {'activationKey': req.query.key},
      {'active': true}
    )
    return res.json({message: 'OK'})
  } catch (error) {
    next(error)
  }
}

exports.update = async (req, res, next) => {
  try {
    await User.findOneAndUpdate(
      {'_id': req.user.id},
      {'first': req.body.first, 'last': req.body.last, 'born': req.body.born, 'bio': req.body.bio}
    )
    return res.json({message: 'OK'})
  } catch (error) {
    next(error)
  }
}


// exports.account = async (req, res, next) => {
//   try {
//     await User.findOne(
//       {'email': req.query.email}
//     )
//     return res.json({message: 'OK'})
//   } catch (error) {
//     next(error)
//   }
// }
