//20180722234612-demo-user.js
'use strict';
const faker = require('faker');

var array = [];
var numUsers = 1000;

for (var i = 0; i<numUsers; i++){

  if(i == 0) {
    // password is user1
    array.push({
      email: "usertest1@gmail.com",
      username: "user1",
      password: "$2b$10$3l2k.FIeEZMBY1Qq0ww9YuGE.BoeysdlR6EZJDznZRYZNR88Eq9I2",
      phone: faker.phone.phoneNumber(),
      crypto: "",
      rating: Math.floor(Math.random() * 10),
      createdAt: faker.date.past(),
      updatedAt: new Date()
    })
    // password is user2  
    array.push({
      email: "usertest2@gmail.com",
      username: "user2",
      password: "$2b$10$YFN3uq9wjR1it.ICD0oxw.uD3hTKYeJql7kEh.7hOmijb9HqFsXNK",
      phone: faker.phone.phoneNumber(),
      crypto: "",
      rating: Math.floor(Math.random() * 10),
      createdAt: faker.date.past(),
      updatedAt: new Date()
    })
  }

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
