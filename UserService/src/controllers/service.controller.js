'use strict'

const User = require('../models/user.model')
exports.get = async (req, res, next) => {
  try {
    const user = new User(await User.findById(req.params.id).exec());
    console.log({user})
    // IMPORTANT expand the get methods for other services
    // and filter (transform) the data  for security
    return res.json({data: {...user.transform(), id: user.id, name: user.name}})
  } catch (error) {
    next(error)
  }
}

exports.update = async (req, res, next) => {
  try {
    await User.findOneAndUpdate(
      {'_id': req.user.id},
      {'first': req.body.first, 'last': req.body.last, 'born': req.body.born, 'bio': req.body.bio}
    )
    return res.json({message: 'OK'})
  } catch (error) {
    next(error)
  }
}
