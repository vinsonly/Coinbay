/*
GENERATE INITIAL ADMINISTRATORS
Create initial admin-level users and associated data.
Admins will have a unique account dashboard view compared to regular users 
as well as additional performable actions (refer to: README.md)
*/

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('AdminUsers', [{
      email: 'admin@demo.com',
      username: 'admin1',
      password: 'admin1',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: 'admin@demo.com',
      username: 'admin2',
      password: 'admin2',
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
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};