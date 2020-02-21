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
    currentUnitPrice: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    total: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.quantity * this.currentUnitPrice;
      }
    },
    symbol: {
      type: DataTypes.STRING,
      validate: {
        len: [1,5]
      },
      allowNull: false
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },
  {
    underscored: true
  }
);

module.exports = Transaction;
