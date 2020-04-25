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
  },
  mongo: {
    uri: process.env.MONGOURI,
    testURI: process.env.MONGOTESTURI
  },
  transporter: {
    service: process.env.TRANSPORTER_SERVICE,
    email: process.env.TRANSPORTER_EMAIL,
    password: process.env.TRANSPORTER_PASSWORD
  },
  activation: process.env.ACTIVATION === 'true',
  secret: process.env.APP_SECRET
}
