'use strict';
module.exports = (sequelize, DataTypes) => {
  var AdminUser = sequelize.define('AdminUser', {
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {});
  AdminUser.associate = function(models) {
    // associations can be defined here
  };
  return AdminUser;
};