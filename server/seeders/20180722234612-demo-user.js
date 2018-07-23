'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'demo@demo.com',
      username: 'Demo1',
      password: 'password',
      phone: '604-123-9123',
      crypto: '0x976d50052bec3578408d060Ea212f03C192FA393',
      rating: 8,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: 'demo@demo.com',
      username: 'Demo2',
      password: 'password',
      phone: '604-123-9123',
      crypto: '0x976d50052bec3578408d060Ea212f03C192FA393',
      rating: 8,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: 'demo@demo.com',
      username: 'Demo3',
      password: 'password',
      phone: '604-123-9123',
      crypto: '0x976d50052bec3578408d060Ea212f03C192FA393',
      rating: 8,
      createdAt: new Date(),
      updatedAt: new Date()
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
    return queryInterface.bulkDelete('Users', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
