const { DataTypes } = require('sequelize');
const db = require('../db');

const Company = db.define('company', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ticker: {
      type: DataTypes.STRING,
      validate: {
        len: [1,5]
      }
    }
  },
  {
    underscored: true
  }
);

module.exports = Company;
