'use strict'

const ObjectId = require('mongoose').Types.ObjectId;
const Transaction = require('../models/transaction.model')
const httpStatus = require('http-status')

const codeServices = require('../services/code.services')
const userServices = require('../services/user.services')

exports.create = async (req, res, next) => {
  console.log({'req.body': req.body})
  try {
    // talk to code service
    const code = (await codeServices.get({code: req.body.code, authorization: req.headers.authorization})).data.data

    const user = req.user;
    const {owner, company} = code;


    console.log('USER ----------', user.id, owner.id, String(user.id) === String(owner.id))
    if (String(user.id) === String(owner.id)) {
      return next(Transaction.ownerUsageError());
      //return Transaction.ownerUsageError();
      // res.status(httpStatus.INTERNAL_SERVER_ERROR)
      // res.send({message: "transaction!"})
    }
    const type = String(user.id) === String(company.id) ? 'free' : 'paid';
    const customer = type === 'free' ? owner : {id: user.id, first: user.first, last: user.last};

    const transaction = new Transaction({customer, company, code: code.code})
    await transaction.save()


    // talk to code service
    await codeServices.use({code: code.code, authorization: req.headers.authorization})
    // const code = res.data.data[0];
    // await Code.findOneAndUpdate(
    //   {'code': code.code},
    //   {'isUsed': true}
    // )

    let isGotFreebie = false;
    let requiredMore = 0;
    if (type === 'paid') {
      // const data = await User.findOne({_id: ObjectId(company.id)})
      // // console.log({data})
      // const {freeRate} = data
      const {freeRate} = await userServices.get(company.id)
      const paid = await Transaction.checkGift(ObjectId(customer.id), ObjectId(company.id));

      const query = {'owner.id': ObjectId(user.id), 'company.id': ObjectId(company.id)}
      const free = (await codeServices.count({query, authorization: req.headers.authorization})).data.total

      //const free = await Code.count({'owner.id': ObjectId(user.id), 'company.id': ObjectId(company.id)}).exec();
      //console.log('#########',{paid, free, freeRate}, Math.floor(paid / freeRate), free)
      requiredMore = freeRate - (paid % freeRate)
      if (Math.floor(paid / freeRate) > free) {
        isGotFreebie = true;
        // const code = new Code({owner: {id: user.id, first: user.first, last: user.last}, company, code: uuidv1()})
        // await code.save()
        await codeServices.generate({
          data: {owner: {id: user.id, first: user.first, last: user.last}, company},
          authorization: req.headers.authorization
        })
      }
    }

    res.status(httpStatus.CREATED)
    res.send({data: {type, company, isGotFreebie, requiredMore}})
  } catch (error) {
    console.log({error})
    return next(Transaction.duplicateUsageError(error))
  }
}

exports.check = async (req, res, next) => {
  try {
    const data = await Transaction.checkGift(
      {'company': req.params.company},
      {'customer': req.params.customer},
      {'freeRate': req.params.freeRate},
    )
    return res.json({data})
  } catch (error) {
    next(error)
  }
}

