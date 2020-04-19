'use strict'

const Joi = require('joi')

// User validation rules
module.exports = {
  create: {
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(128).required(),
      first: Joi.string().max(30).required(),
      last: Joi.string().max(30).required(),
      //born: Joi.string().max(10)
    }
  }
}
