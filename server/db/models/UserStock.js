const { DataTypes } = require('sequelize');
const db = require('../db');

const UserStock = db.define('user_stock', {
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

module.exports = UserStock;
