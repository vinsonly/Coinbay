'use strict';
const faker = require('faker');

var array = [];

var categories = {  0: "Automotives",
                    1: "Beauty",
                    2: "Pets",
                    3: "Electronics",
                    4: "Books",
                    5: "Clothing",
                    6: "Jewelry",
                    7: "Art",
                    8: "Health",
                    9: "Gardening",
                    10: "Office",
                    11: "Music",
                    12: "Home",
                    13: "Outdoors",
                    14: "Toys",
                    15: "Tools",                    
                    16: "Antiques",
                    17: "miscellaneous"
                };

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

for (var i = 0; i<100; i++){
  array.push({
    postingTitle: faker.commerce.productName(),
    modelName: faker.commerce.productMaterial(),
    brand: faker.company.companyName(),
    price: faker.commerce.price(),
    category: categories[getRandomInt(18)],
    status: 'active',
    description: faker.lorem.sentence(),
    images: ["https://i.kinja-img.com/gawker-media/image/upload/s--zIoxCmxH--/c_scale,f_auto,fl_progressive,q_80,w_800/e83aktlptf1pybjfkcex.jpg"],
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
