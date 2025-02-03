'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      // define association here
    }
  }
  Users.init({
    id: {
      type: DataTypes.UUID, // Change to UUID
      defaultValue: DataTypes.UUIDV4, // Automatically generate UUID
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    balance: DataTypes.FLOAT,
  }, {
    sequelize,
    modelName: 'Users', // Changed to capitalized 'Users'
  });
  return Users;
};
