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
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: { // active, sold, pending
      type: DataTypes.ENUM('active', 'sold', 'pendingConfirmation', 'pending'),
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
    date: {
      type: DataTypes.STRING,
      allowNull: true
    },
    location: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    },
    accepted: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    transaction: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    /* transaction:
      - contract address - string
      - txid's - string array
      - startedAt - integer (unix time)
      - completedAt - integer (unix time)
      
    */
    // transactions: {
    //   type: DataTypes.ARRAY(DataTypes.STRING),
    //   allowNull: true
    // },
    // contractAddress: {
    //   type: DataTypes.STRING,
    //   allowNull: true
    // },
  }, {});
  Posting.associate = function(models) {
    // associations can be defined here
    Posting.belongsTo(models.User, {
      as: 'Buyer',
      foreignKey: 'buyerId'
    })

    Posting.belongsTo(models.User, {
      as: 'User',
      foreignKey: 'userId'
    });

  };
  return Posting;
};