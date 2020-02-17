const { DataTypes } = require('sequelize');
const db = require('../db')

const Stock = db.define('stock', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    shares: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  },
  {
    underscored: true
  }
);

module.exports = Stock;
