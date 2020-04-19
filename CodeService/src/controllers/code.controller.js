'use strict'

const ObjectId = require('mongoose').Types.ObjectId;
const QR = require('../models/code.model')
// const config = require('../config')
const httpStatus = require('http-status')
const uuidv1 = require('uuid/v1')

exports.generate = async (req, res, next) => {

  console.log({'req.body': req.body})


  try {
    const {quantity, owner, company} = req.body;
    for (let i = 0; i < quantity; i++) {
      const qr = new QR({owner, company, code: uuidv1()})
      await qr.save()
    }
    res.status(httpStatus.CREATED)
    res.send({message: "generated!"})
  } catch (error) {
    console.log({error})
    return next()
    //return next(QR.checkDuplicateEmailError(error))
  }
}

exports.use = async (req, res, next) => {
  try {
    await QR.findOneAndUpdate(
      {'code': req.params.code},
      {'isUsed': true}
    )
    return res.json({message: req.params.code})
  } catch (error) {
    next(error)
  }
}

exports.get = async (req, res, next) => {
  try {
    if (req.query.id) {
      const item = await QR.findOne({'id': req.query.id})
      return res.json({data: item})
    } else {
      const total = await QR.count({'owner.id': ObjectId(req.user.id), 'company.id': ObjectId(req.user.id)}).exec()
      const available = await QR.count({
        'owner.id': ObjectId(req.user.id),
        'company.id': ObjectId(req.user.id),
        isUsed: false
      }).exec()
      const gift = await QR.count({
        'owner.id': {$ne: ObjectId(req.user.id)},
        'company.id': ObjectId(req.user.id)
      }).exec()
      const gifted = await QR.count({
        'owner.id': {$ne: ObjectId(req.user.id)},
        'company.id': ObjectId(req.user.id),
        isUsed: true
      }).exec()
      const freebies = await QR.count({
        'owner.id': ObjectId(req.user.id),
        'company.id': {$ne: ObjectId(req.user.id)}
      }).exec()
      const used = await QR.count({
        'owner.id': ObjectId(req.user.id),
        'company.id': {$ne: ObjectId(req.user.id)},
        isUsed: true
      }).exec()
      const meta = {total, available, gift, gifted, freebies, used}
      const data = await QR.find({'owner.id': ObjectId(req.user.id)}).exec()
      return res.json({meta, data})
    }
  } catch (error) {
    next(error)
  }
}
