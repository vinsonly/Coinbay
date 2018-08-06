/*
GENERATE INITIAL USERS
Populate database with randomly generated users and associated data.
Initial test users #1 and #2 will also be created and assigned multiple postings (refer to: demo-postings.js)
*/

'use strict';
const faker = require('faker');

var array = [];
var numUsers = 1000;

for (var i = 0; i<numUsers; i++){

  if(i == 0) {
    // Creating test user1 (password is the same)
    array.push({
      email: "usertest1@gmail.com",
      username: "user1",
      password: "$2b$10$3l2k.FIeEZMBY1Qq0ww9YuGE.BoeysdlR6EZJDznZRYZNR88Eq9I2",
      phone: faker.phone.phoneNumber(),
      crypto: "0x6841EBBd0CBC33dcD114C548C99396710cc25e5B",
      rating: Math.floor(Math.random() * 10),
      createdAt: faker.date.past(),
      updatedAt: new Date()
    })
    // Creating test user2 (password is the same)
    array.push({
      email: "usertest2@gmail.com",
      username: "user2",
      password: "$2b$10$YFN3uq9wjR1it.ICD0oxw.uD3hTKYeJql7kEh.7hOmijb9HqFsXNK",
      phone: faker.phone.phoneNumber(),
      crypto: "0x9ba1F32F809b6C58945Ada29d10cB82cA078C5E5",
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
