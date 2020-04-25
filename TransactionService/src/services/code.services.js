'use strict'

const config = require('../config')
const axios = require('axios')

exports.generate = async ({data, authorization = null}) => {
  return await axios.post(`${config.services.code}/api/codes/generate`, data,
    {
      headers: {authorization}
    })
    .then(function (response) {
      console.log(`|-------------------------------------------------------------|`)
      console.log(`\t${JSON.stringify(response.data)}`);
      console.log(`|-------------------------------------------------------------|`)
      return response
    })
    .catch(function (error) {
      console.log(`|~~~~~~~~~~~~~~~~~~~~~~~~~~ ERROR ~~~~~~~~~~~~~~~~~~~~~~~~~~~~|`)
      console.log(`\t${error.response.status} ~ ${error.response.statusText}`)
      console.log(`|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|`)
    });
}

exports.get = async ({code, authorization = null}) => {
  return await axios.get(`${config.services.code}/api/codes/${code}`,
    {
      headers: {authorization}
    })
    .then(function (response) {
      console.log(`|-------------------------------------------------------------|`)
      console.log(`\t${JSON.stringify(response.data)}`);
      console.log(`|-------------------------------------------------------------|`)
      return response
    })
    .catch(function (error) {
      console.log(`|~~~~~~~~~~~~~~~~~~~~~~~~~~ ERROR ~~~~~~~~~~~~~~~~~~~~~~~~~~~~|`)
      console.log(`\t${error.response.status} ~ ${error.response.statusText}`)
      console.log(`|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|`)
    });
}

exports.use = async ({code, authorization = null}) => {
  return await axios.put(`${config.services.code}/api/codes/use/${code}`,{},
    {
      headers: {authorization}
    })
    .then(function (response) {
      console.log(`|-------------------------------------------------------------|`)
      console.log(`\t${JSON.stringify(response.data)}`);
      console.log(`|-------------------------------------------------------------|`)
      return response
    })
    .catch(function (error) {
      console.log(`|~~~~~~~~~~~~~~~~~~~~~~~~~~ ERROR ~~~~~~~~~~~~~~~~~~~~~~~~~~~~|`)
      console.log(`\t${error.response.status} ~ ${error.response.statusText}`)
      console.log(`|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|`)
    });
}

exports.count = async ({query, authorization = null}) => {
  return await axios.post(`${config.services.code}/api/codes/count`, {query},
    {
      headers: {authorization}
    })
    .then(function (response) {
      console.log(`|-------------------------------------------------------------|`)
      console.log(`\t${JSON.stringify(response.data)}`);
      console.log(`|-------------------------------------------------------------|`)
      return response
    })
    .catch(function (error) {
      console.log(`|~~~~~~~~~~~~~~~~~~~~~~~~~~ ERROR ~~~~~~~~~~~~~~~~~~~~~~~~~~~~|`)
      console.log(`\t${error.response.status} ~ ${error.response.statusText}`)
      console.log(`|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|`)
    });
}
