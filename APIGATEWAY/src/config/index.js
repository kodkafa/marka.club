require('dotenv').config() // load .env file

module.exports = {
  app: process.env.APP,
  service: process.env.SERVICE,
  port: process.env.PORT,
  hostname: process.env.HOSTNAME,
  env: process.env.NODE_ENV,
  services: {
    front_end: process.env.FRONT_END,
    gateway: process.env.API_GATEWAY,
    auth: process.env.AUTH_SERVICE,
    user: process.env.USER_SERVICE,
    code: process.env.CODE_SERVICE,
    transaction: process.env.TRANSACTION_SERVICE,
    qr: process.env.QR_SERVICE
  }
}
