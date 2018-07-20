'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
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
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    nano: {
      type: DataTypes.STRING,
      allowNull: true
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Posting, {
      foreignKey: 'postingId',
      as: 'soldPosts'
    });

    User.hasMany(models.Posting, {
      foreignKey: 'postingId',
      as: 'boughtPosts'
    });

    User.hasMany(models.Posting, {
      foreignKey: 'postingId',
      as: 'pendingPost'
    });

    User.hasMany(models.Posting, {
      foreignKey: 'postingId',
      as: 'activePosts'
    });

  };
  return User;
};