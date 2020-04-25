'use strict'

const config = require('../config')
const axios = require('axios')

exports.get = async (id) => {
  return await axios.get(`${config.services.user}/api/users/${id}`)
    .then(function (response) {
      console.log(`|-------------------------------------------------------------|`)
      console.log(`\t${JSON.stringify(response.data.data)}`);
      console.log(`|-------------------------------------------------------------|`)
      return response.data.data
    })
    .catch(function (error) {
      console.log(`|~~~~~~~~~~~~~~~~~~~~~~~~~~ ERROR ~~~~~~~~~~~~~~~~~~~~~~~~~~~~|`)
      console.log(`\t${error.response.status} ~ ${error.response.statusText}`)
      console.log(`|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|`)
    });
}
