'use strict';
const faker = require('faker');

var array = [];

for (var i = 0; i<100; i++){
  array.push({
    postingTitle: faker.commerce.productName(),
    modelName: faker.commerce.productMaterial(),
    brand: faker.company.companyName(),
    price: faker.commerce.price(),
    status: 'active',
    description: faker.lorem.sentence(),
    createdAt: faker.date.past(),
    updatedAt: new Date(),
    // to randomize use: userId: Math.floor(Math.random() * 100)
    userId: i + 1,
    buyerId: 2 // random user from 0 to 10
  });
};

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Postings', array, {});
  },

  down: (queryInterface, Sequelize) => {
  }
};
