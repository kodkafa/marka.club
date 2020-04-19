'use strict'
const mongoose = require('mongoose')

const httpStatus = require('http-status')
const APIError = require('../utils/APIError')
const Schema = mongoose.Schema
const {ObjectId} = Schema.Types;

const owner = new Schema({
  id: {
    type: ObjectId,
    required: true
  },
  first: {
    type: String,
    required: true
  },
  last: {
    type: String,
    required: true
  },
})

const company = new Schema({
  id: {
    type: ObjectId,
    required: true
  },
  name: {
    type: String,
    required: true
  },
})

const schema = new Schema({
  owner,
  company,
  code: {
    type: String,
    required: true,
    unique: true,
    maxlength: 256
  },
  isUsed: {
    type: Boolean,
    default: false
  },
}, {
  timestamps: true
})


schema.statics = {
  owner,
  company,
  checkUsageError(err) {
    if (err.code === 11000) {
      const error = new Error('The code already used')
      error.errors = [{
        field: 'code',
        location: 'body',
        messages: ['The code already used']
      }]
      error.status = httpStatus.CONFLICT
      return error
    }
    return err
  },
  checkDuplicateCodeError(err) {
    if (err.code === 11000) {
      const error = new Error('Code already generated')
      error.errors = [{
        field: 'code',
        location: 'body',
        messages: ['Code already generated']
      }]
      error.status = httpStatus.CONFLICT
      return error
    }
    return err
  },

  async markUsed(payload) {
    const {code} = payload
    if (!code) throw new APIError('The code is required!')

    const qr = await this.findOne({code}).exec()
    if (!qr) throw new APIError(`No record associated with the ${code}`, httpStatus.NOT_FOUND)

    if (await qr.isUsed()) throw new APIError(`The code is already used`, httpStatus.UNAUTHORIZED)

    return qr
  }
}

module.exports = mongoose.model('codes', schema)
