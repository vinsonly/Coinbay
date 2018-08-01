//20180722234612-demo-user.js
'use strict';
const faker = require('faker');

var array = [];
var numUsers = 1000;

for (var i = 0; i<numUsers; i++){
  array.push({
    email: faker.internet.email(),
    username: faker.internet.userName(),
    password: faker.internet.password(),
    phone: faker.phone.phoneNumber(),
    crypto: faker.finance.bitcoinAddress(),
    rating: Math.floor(Math.random() * 10),
    createdAt: faker.date.past(),
    updatedAt: new Date()
  });
};


module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', array, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
