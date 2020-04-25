'use strict'

const app = require('./services/express')
const check = require('./services/check')
app.start()

check.auth()
check.user()
check.code()
check.transaction()
check.qr()

module.exports = app


