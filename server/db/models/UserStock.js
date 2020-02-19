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
    },
    symbol: {
      type: DataTypes.STRING,
      validate: {
        len: [1,5]
      },
      allowNull: false,
      unique: true
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },
  {
    underscored: true,
    // name: {
    //   singular: 'userStock',
    //   plural:'userStocks'
    // }
  }
);

module.exports = UserStock;
