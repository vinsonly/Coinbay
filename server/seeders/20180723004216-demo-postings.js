'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Postings', [{
      postingTitle: 'DemoPosting1',
      modelName: 'model',
      brand: 'brand',
      price: 100.25,
      status: 'active',
      description: 'description',
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 2
    },
    {
      postingTitle: 'DemoPosting2',
      modelName: 'model',
      brand: 'brand',
      price: 100.25,
      status: 'active',
      description: 'description',
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 3
    },
    {
      postingTitle: 'DemoPosting3',
      modelName: 'model',
      brand: 'brand',
      price: 100.25,
      status: 'active',
      description: 'description',
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 4
    },
    {
      postingTitle: 'DemoPosting4',
      modelName: 'model',
      brand: 'brand',
      price: 100.25,
      status: 'active',
      description: 'description',
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 5
    },
    {
      postingTitle: 'DemoPosting5',
      modelName: 'model',
      brand: 'brand',
      price: 100.25,
      status: 'active',
      description: 'description',
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 3
    },
    {
      postingTitle: 'DemoPosting6',
      modelName: 'model',
      brand: 'brand',
      price: 100.25,
      status: 'active',
      description: 'description',
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 2
    },
    {
      postingTitle: 'DemoPosting7',
      modelName: 'model',
      brand: 'brand',
      price: 100.25,
      status: 'active',
      description: 'description',
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 3
    },
    {
      postingTitle: 'DemoPosting8',
      modelName: 'model',
      brand: 'brand',
      price: 100.25,
      status: 'active',
      description: 'description',
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 4
    },
    {
      postingTitle: 'DemoPosting9',
      modelName: 'model',
      brand: 'brand',
      price: 100.25,
      status: 'active',
      description: 'description',
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 5
    },
    {
      postingTitle: 'DemoPosting10',
      modelName: 'model',
      brand: 'brand',
      price: 100.25,
      status: 'active',
      description: 'description',
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 5
    }], {});
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
