'use strict';
module.exports = (sequelize, DataTypes) => {
  var Posting = sequelize.define('Posting', {
    postingTitle: {
      type: DataTypes.STRING,
      allowNull: false
    },
    modelName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.NUMERIC(10,2),
      allowNull: false
    },
    status: { // active, sold, pending
      type: DataTypes.ENUM('active', 'sold', 'pending'),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    abstract: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    },
    location: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    }
  }, {});
  Posting.associate = function(models) {
    // associations can be defined here
    Posting.belongsTo(models.User, {
      foreignKey: 'userId'
    });
  };
  return Posting;
};
