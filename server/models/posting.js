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
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    abstract: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    }
  }, {});
  Posting.associate = function(models) {
    // associations can be defined here
    Posting.belongsTo(models.Todo, {
      foreignKey: 'userId'
    });
  };
  return Posting;
};