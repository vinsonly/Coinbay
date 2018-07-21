'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    crypto: {
      type: DataTypes.STRING,
      allowNull: true
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: { min: 0, max: 10 }
    },
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Posting, {
      foreignKey: 'userId',
      as: 'soldPosts'
    });

    User.hasMany(models.Posting, {
      foreignKey: 'userId',
      as: 'boughtPosts'
    });

    User.hasMany(models.Posting, {
      foreignKey: 'userId',
      as: 'pendingPost'
    });

    User.hasMany(models.Posting, {
      foreignKey: 'userId',
      as: 'activePosts'
    });

  };
  return User;
};