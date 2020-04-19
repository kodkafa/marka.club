'use strict'
const mongoose = require('mongoose')

const httpStatus = require('http-status')
const APIError = require('../utils/APIError')
const Schema = mongoose.Schema
const {ObjectId} = Schema.Types;

const customer = new Schema({
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
  customer,
  company,
  code: {
    type: String,
    required: true,
    maxlength: 256
  },
  type: {
    type: String,
    default: 'paid',
    enum: ['paid', 'free']
  }
}, {
  timestamps: true
})

schema.index({code: 1, type: 1}, {unique: true});

schema.statics = {
  customer,
  company,
  ownerUsageError() {

    //throw new APIError('You can not use your own code!')

    const error = new Error('You can not use your own code!')
    error.errors = [{
      field: 'code',
      location: 'body',
      messages: ['You can not use your own code!']
    }]
    error.status = httpStatus.CONFLICT
    return error
  },
  duplicateUsageError(err) {
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

  async checkGift(customer, company) {
    if (!company) throw new APIError('The company data are required!')
    if (!customer) throw new APIError('The customer data are required!')
    // if (!freeRate) throw new APIError('The freeRate is required!')

    const count = await this.count({'company.id': company, 'customer.id': customer, type: 'paid'}).exec()
    console.log({count})
    return count
  }
}

module.exports = mongoose.model('Transaction', schema)
