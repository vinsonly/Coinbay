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
            9: "Home & Garden",
            10: "Office",
            11: "Music",
            12: "Housing",
            13: "Sports & Outdoors",
            14: "Toys & Entertainment",
            15: "Tools",
            16: "Antiques",
            17: "Miscellaneous"
};

// Sample images for each category
var images = {
  0: "https://thrift-shop-bucket.s3.amazonaws.com/0-nio-es6.jpg",
  1: "https://thrift-shop-bucket.s3.amazonaws.com/1-beauty.jpg",
  2: "https://thrift-shop-bucket.s3.amazonaws.com/2-pets.png",
  3: "https://thrift-shop-bucket.s3.amazonaws.com/3-iphone.jpg",
  4: "https://thrift-shop-bucket.s3.amazonaws.com/4-cracking-coding-interview.jpg",
  5: "https://thrift-shop-bucket.s3.amazonaws.com/5-nuptse.jpg",
  6: "https://thrift-shop-bucket.s3.amazonaws.com/6-championship-ring.jpg",
  7: "https://thrift-shop-bucket.s3.amazonaws.com/7-art.jpg",
  8: "https://thrift-shop-bucket.s3.amazonaws.com/8-health.jpg",
  9: "https://thrift-shop-bucket.s3.amazonaws.com/9-garden.jpg",
  10: "https://thrift-shop-bucket.s3.amazonaws.com/10-office.jpg",
  11: "https://thrift-shop-bucket.s3.amazonaws.com/11-music.jpg",
  12: "https://thrift-shop-bucket.s3.amazonaws.com/12-housing.jpg",
  13: "https://thrift-shop-bucket.s3.amazonaws.com/13-outdoors.jpg",
  14: "https://thrift-shop-bucket.s3.amazonaws.com/14-toys.jpg",
  15: "https://thrift-shop-bucket.s3.amazonaws.com/15-tools.jpg",
  16: "https://thrift-shop-bucket.s3.amazonaws.com/16-antiques.jpg",
  17: "https://thrift-shop-bucket.s3.amazonaws.com/17-misc.jpg",
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
    createdAt: faker.date.between('2018-01-01', '2018-08-01'),
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
    createdAt: faker.date.between('2018-01-01', '2018-08-01'),
    updatedAt: new Date(),
    // to randomize use: userId: Math.floor(Math.random() * 100)
    userId: 2,
    buyerId: 3// random user from 0 to 10,
  });
}


var numPostings = 1000; //this needs to match number of users generated, see seeders demo-user.js file
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
    createdAt: faker.date.between('2018-01-01', '2018-08-01'),
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
