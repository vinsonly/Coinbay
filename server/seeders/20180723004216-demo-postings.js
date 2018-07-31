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
            0: "https://i.kinja-img.com/gawker-media/image/upload/s--zIoxCmxH--/c_scale,f_auto,fl_progressive,q_80,w_800/e83aktlptf1pybjfkcex.jpg",
            1: "https://imagesvc.timeincapp.com/v3/mm/image?url=https%3A%2F%2Fcdn-img.instyle.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2F684xflex%2Fpublic%2F1453748742%2F012516-Makeup-Kit-lead.jpg%3Fitok%3DxlymEJhu&w=700&q=85",
            2: "http://www.salemcountyhumanesociety.org/images/banner4.jpg",
            3: "https://epinoy.com/wp-content/uploads/2018/01/27073250_2023591464556287_1715396848864103603_n.jpg",
            4: "http://it-ebooks.directory/e-books/wiley/_images/med_Wiley.Creating.Web.Pages.For.Dummies.7th.Edition.Oct.2004.ISBN.0764573276.pdf.jpg",
            5: "https://media.nlyman.com/i/nlyscandinavia/226326-0425_01?$productpage_slider_2x$",
            6: "https://cdn.shopify.com/s/files/1/2666/5024/products/3PCS-Set-Women-Jewelry-Sets-Gold-Color-Wedding-Bridal-Jewellery-Set-Geometric-Crystal-Necklace-Ring-Earrings_d313ae91-1c23-4ea3-a1c1-e1ac1ec3b67f.jpg?v=1515558217",
            7: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQLoAFe6YjSQbXK7QM8hzEI41fmZRayEBwvjN33BkSqDYO2Uma",
            8: "https://nobullnutrition.co/wp-content/uploads/2016/05/DSC_5937.jpg",
            9: "http://gardencenternaples.com/images/pages/supplies/gardening-supplies-1.jpg",
            10: "https://images-na.ssl-images-amazon.com/images/I/71yi4klCPbL._SY450_.jpg",
            11: "http://sessionville.com/assets/images/articles/what-you-need-to-know-before-starting-a-vinyl-collection-970x728.jpg",
            12: "http://www.landscapinggallery.net/wp-content/uploads/2016/09/Wooden-Pallet-Furniture-for-Sale-960x600.jpg",
            13: "http://userscontent2.emaze.com/images/33e5b9df-85d3-48c9-b322-0cdbb492a308/635346019651963308_Outdoor-Equipment.jpg",
            14: "http://pure-ecommerce.co.uk/images/toy-internet-business-for-sale-pure-ecommerce.jpg",
            15: "https://i.pinimg.com/736x/2f/11/1e/2f111e0eb99e04255d01343f04a57388--dewalt-power-tools-power-tools-for-sale.jpg",                    
            16: "https://cdn10.phillymag.com/wp-content/uploads/2015/09/antiques.jpg",
            17: "http://www.bitreplay.com/wp-content/uploads/buckets31.jpg"
};

//Generate randomized fake postings
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
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
