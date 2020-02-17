const { DataTypes } = require('sequelize');
const db = require('../db');

const Transaction = db.define('transaction', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  },
  {
    hooks: {
      // afterCreate: () => {

      // }
    },
    underscored: true
  }
);

module.exports = Transaction;
