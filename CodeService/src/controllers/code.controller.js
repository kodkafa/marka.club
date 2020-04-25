'use strict'

const ObjectId = require('mongoose').Types.ObjectId;
const Code = require('../models/code.model')
// const config = require('../config')
const httpStatus = require('http-status')
const uuidv1 = require('uuid/v1')

exports.generate = async (req, res, next) => {

  console.log({'req.body': req.body})


  try {
    const {quantity = 1, owner, company} = req.body;
    for (let i = 0; i < quantity; i++) {
      const qr = new Code({owner, company, code: uuidv1()})
      await qr.save()
    }
    res.status(httpStatus.CREATED)
    res.send({message: "generated!"})
  } catch (error) {
    console.log({error})
    return next()
    //return next(Code.checkDuplicateEmailError(error))
  }
}

exports.use = async (req, res, next) => {
  try {
    await Code.findOneAndUpdate(
      {'code': req.params.code},
      {'isUsed': true}
    ).exec()
    return res.json({message: req.params.code})
  } catch (error) {
    next(error)
  }
}

exports.get = async (req, res, next) => {
  try {
    if (req.params.code) {
      const item = await Code.findOne({'code': req.params.code}).exec();
      return res.json({data: item})
    } else {
      const total = await Code.count({'owner.id': ObjectId(req.user.id), 'company.id': ObjectId(req.user.id)}).exec()
      const available = await Code.count({
        'owner.id': ObjectId(req.user.id),
        'company.id': ObjectId(req.user.id),
        isUsed: false
      }).exec()
      const gift = await Code.count({
        'owner.id': {$ne: ObjectId(req.user.id)},
        'company.id': ObjectId(req.user.id)
      }).exec()
      const gifted = await Code.count({
        'owner.id': {$ne: ObjectId(req.user.id)},
        'company.id': ObjectId(req.user.id),
        isUsed: true
      }).exec()
      const freebies = await Code.count({
        'owner.id': ObjectId(req.user.id),
        'company.id': {$ne: ObjectId(req.user.id)}
      }).exec()
      const used = await Code.count({
        'owner.id': ObjectId(req.user.id),
        'company.id': {$ne: ObjectId(req.user.id)},
        isUsed: true
      }).exec()
      const meta = {total, available, gift, gifted, freebies, used}
      const data = await Code.find({'owner.id': ObjectId(req.user.id)}).exec()
      return res.json({meta, data})
    }
  } catch (error) {
    next(error)
  }
}

exports.count = async (req, res, next) => {
  try {
    const total = await Code.count(req.body.query).exec()
    return res.json({total})
  } catch (error) {
    next(error)
  }
}
