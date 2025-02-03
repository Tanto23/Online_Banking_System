'use strict';
const {
  Model
} = require('sequelize');
const { v4: uuidv4 } = require('uuid'); 

module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    static associate(models) {
      // define association here
    }
  }
  transaction.init({
    id: {
      type: DataTypes.UUID, 
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    senderId: DataTypes.STRING,
    receiverId: DataTypes.STRING,
    amount: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'transaction',
  });
  return transaction;
};
