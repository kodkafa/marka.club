'use strict'

const config = require('../config')
const userService = require('../services/user.services')
const passportJWT = require('passport-jwt')

const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy

const jwtOptions = {
  secretOrKey: config.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

const jwtStrategy = new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
  const user = await userService.get(jwtPayload.sub)
  if (user) {
    return done(null, user)
  } else {
    return done(null, false)
  }
  // })
})

exports.jwtOptions = jwtOptions
exports.jwt = jwtStrategy
