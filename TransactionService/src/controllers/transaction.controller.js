'use strict'

const ObjectId = require('mongoose').Types.ObjectId;
const User = require('../models/user.model')
const Code = require('../models/code.model')
const Transaction = require('../models/transaction.model')
// const config = require('../config')
const httpStatus = require('http-status')
const uuidv1 = require('uuid/v1')

exports.create = async (req, res, next) => {

  console.log({'req.body': req.body})

  try {

    const code = await Code.findOne(
      {'code': req.body.code}
    );
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

    await Code.findOneAndUpdate(
      {'code': code.code},
      {'isUsed': true}
    )

    let isGotFreebie = false;
    let requiredMore = 0;
    if (type === 'paid') {
      const data = await User.findOne({_id: ObjectId(company.id)})
      // console.log({data})
      const {freeRate} = data
      const paid = await Transaction.checkGift(ObjectId(customer.id), ObjectId(company.id));
      const free = await Code.count({'owner.id': ObjectId(user.id), 'company.id': ObjectId(company.id)}).exec();
      //console.log('#########',{paid, free, freeRate}, Math.floor(paid / freeRate), free)
      requiredMore = freeRate - (paid % freeRate)
      if (Math.floor(paid / freeRate) > free) {
        isGotFreebie = true;
        const code = new Code({owner: {id: user.id, first: user.first, last: user.last}, company, code: uuidv1()})
        await code.save()
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

