'use strict'

const config = require('../config')
const axios = require('axios')

exports.gateway = async () => {
  await axios.get(`${config.services.gateway}/api/status`)
    .then(function (response) {
      console.log(`|-------------------------------------------------------------|`)
      console.log(`\t${response.data.message}`);
      console.log(`|-------------------------------------------------------------|`)
    })
    .catch(function (error) {
      console.log(error);
      console.log(`|-------------------------- ERROR ----------------------------|`)
      console.log(`\t${config.services.gateway} is DOWN!`)
      console.log(`|-------------------------------------------------------------|`)
    });
}

exports.auth = async () => {
  await axios.get(`${config.services.auth}/api/status`)
    .then(function (response) {
      console.log(`|-------------------------------------------------------------|`)
      console.log(`\t${response.data.message}`);
      console.log(`|-------------------------------------------------------------|`)
    })
    .catch(function (error) {
      console.log(error);
      console.log(`|-------------------------- ERROR ----------------------------|`)
      console.log(`\t${config.services.auth} is DOWN!`)
      console.log(`|-------------------------------------------------------------|`)
    });
}

exports.user = async () => {
  await axios.get(`${config.services.user}/api/status`)
    .then(function (response) {
      console.log(`|-------------------------------------------------------------|`)
      console.log(`\t${response.data.message}`);
      console.log(`|-------------------------------------------------------------|`)
    })
    .catch(function (error) {
      console.log(error);
      console.log(`|-------------------------- ERROR ----------------------------|`)
      console.log(`\t${config.services.user} is DOWN!`)
      console.log(`|-------------------------------------------------------------|`)
    });
}

exports.code = async () => {
  await axios.get(`${config.services.code}/api/status`)
    .then(function (response) {
      console.log(`|-------------------------------------------------------------|`)
      console.log(`\t${response.data.message}`);
      console.log(`|-------------------------------------------------------------|`)
    })
    .catch(function (error) {
      console.log(error);
      console.log(`|-------------------------- ERROR ----------------------------|`)
      console.log(`\t${config.services.code} is DOWN!`)
      console.log(`|-------------------------------------------------------------|`)
    });
}

exports.transaction = async () => {
  await axios.get(`${config.services.transaction}/api/status`)
    .then(function (response) {
      console.log(`|-------------------------------------------------------------|`)
      console.log(`\t${response.data.message}`);
      console.log(`|-------------------------------------------------------------|`)
    })
    .catch(function (error) {
      console.log(error);
      console.log(`|-------------------------- ERROR ----------------------------|`)
      console.log(`\t${config.services.transaction} is DOWN!`)
      console.log(`|-------------------------------------------------------------|`)
    });
}

exports.qr = async () => {
  await axios.get(`${config.services.qr}/api/status`)
    .then(function (response) {
      console.log(`|-------------------------------------------------------------|`)
      console.log(`\t${response.data.message}`);
      console.log(`|-------------------------------------------------------------|`)
    })
    .catch(function (error) {
      console.log(error);
      console.log(`|-------------------------- ERROR ----------------------------|`)
      console.log(`\t${config.services.qr} is DOWN!`)
      console.log(`|-------------------------------------------------------------|`)
    });
}
