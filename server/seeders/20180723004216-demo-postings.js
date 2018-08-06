/*
GENERATE INITIAL DATA FOR POSTS
Populate database with randomly generated postings and associated data.
All postings generated will be under one of the various categories listed.
Postings will also be created and assigned to test users #1 and #2 (refer to: demo-users.js)
*/

'use strict';

const faker = require('faker'); //Faker library used for generating fake data

var array = [];

var categories = {
            0: "Automotives",
            1: "Beauty",
            2: "Pets",
            3: "Electronics",
            4: "Books",
            5: "Clothing",
            6: "Jewelry & Accessories",
            7: "Art",
            8: "Health",
            9: "Gardening",
            10: "Office",
            11: "Music",
            12: "Home & Furniture",
            13: "Sports & Outdoors",
            14: "Toys",
            15: "Tools",
            16: "Antiques",
            17: "Miscellaneous"
};

// Sample images for each category
var images = {
            0: "https://i.imgur.com/Mq5SNYg.jpg",
            1: "https://i.imgur.com/2LVebjF.jpg",
            2: "https://i.imgur.com/HNrEwz3.png",
            3: "https://i.imgur.com/2CbSHuj.jpg",
            4: "https://i.imgur.com/8wsZnTz.jpg",
            5: "https://i.imgur.com/BPaF0O4.jpg",
            6: "https://i.imgur.com/4LXRixl.jpg",
            7: "https://i.imgur.com/PZomq2A.jpg",
            8: "https://i.imgur.com/YRwoNB4.jpg",
            9: "https://i.imgur.com/jZn1Yhh.jpg",
            10: "https://i.imgur.com/QKIitvA.jpg",
            11: "https://i.imgur.com/v8rGiYc.jpg",
            12: "https://i.imgur.com/9jPq2hy.jpg",
            13: "https://i.imgur.com/MFhxFEO.jpg",
            14: "https://i.imgur.com/pJCZUGe.jpg",
            15: "https://i.imgur.com/j5DSa41.jpg",
            16: "https://i.imgur.com/DGRm1It.jpg",
            17: "https://i.imgur.com/blvKIcs.jpg"
};

//Generate randomized fake postings
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// Generate postings that will be owned by User 1
for(var k = 0; k < 10; k++) {
  let randomInt = getRandomInt(18);

  let category = categories[randomInt];

  let image = images[randomInt]

  array.push({
    postingTitle: faker.commerce.productName(),
    modelName: faker.commerce.productMaterial(),
    brand: faker.company.companyName(),
    price: faker.commerce.price(),
    category: category,
    status: 'active',
    description: faker.lorem.sentence(),
    images: [image],
    date: faker.date.future(),
    createdAt: faker.date.past(),
    updatedAt: new Date(),
    // to randomize use: userId: Math.floor(Math.random() * 100)
    userId: 1,
    buyerId: 3// random user from 0 to 10
  });
}

// Generate postings that will be owned by User 2
for(var j = 0; j < 10; j++) {
  let randomInt = getRandomInt(18);

  let category = categories[randomInt];

  let image = images[randomInt]

  array.push({
    postingTitle: faker.commerce.productName(),
    modelName: faker.commerce.productMaterial(),
    brand: faker.company.companyName(),
    price: faker.commerce.price(),
    category: category,
    status: 'active',
    description: faker.lorem.sentence(),
    images: [image],
    date: faker.date.future(),
    createdAt: faker.date.past(),
    updatedAt: new Date(),
    // to randomize use: userId: Math.floor(Math.random() * 100)
    userId: 2,
    buyerId: 3// random user from 0 to 10,
  });
}


var numPostings = 10000; //this needs to match number of users generated, see seeders demo-user.js file
for (var i = 0; i<numPostings; i++){

  let randomInt = getRandomInt(18);

  let category = categories[randomInt];

  let image = images[randomInt]

  array.push({
    postingTitle: faker.commerce.productName(),
    modelName: faker.commerce.productMaterial(),
    brand: faker.company.companyName(),
    price: faker.commerce.price(),
    category: category,
    status: 'active',
    description: faker.lorem.sentence(),
    images: [image],
    date: faker.date.future(),
    createdAt: faker.date.past(),
    updatedAt: new Date(),
    // to randomize use: userId: Math.floor(Math.random() * 100)
    userId: i + 1,
    buyerId: 4 // random user from 0 to 10
  });
};

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Postings', array, {});
  },

  down: (queryInterface, Sequelize) => {
  }
};
