// 'use strict'
const QRCode = require('qrcode-svg')
const httpStatus = require('http-status')

exports.generate = async (req, res, next) => {
 try {
    const {data} = req.body

    const qrcode = new QRCode({
      content: data,
      padding: 4,
      width: 256,
      height: 256,
      color: '#000000',
      background: '#ffffff',
      ecl: 'M'
    })
    // qrcode.save("sample.svg", function(error) {
    //   if (error) throw error;
    //   console.log("Done!");
    // });

    const image = qrcode.svg()

    res.status(httpStatus.CREATED)
    res.send({data: image})
  } catch (error) {
    console.log({error})
    return next()
  }
}
