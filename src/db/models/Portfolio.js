const { DataTypes } = require('sequelize');
const db = require('../db');

const Portfolio = db.define('portfolio',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        balance: {
            type: DataTypes.FLOAT,
            defaultValue: 5000.00
        }
    },
    {
        underscored: true
    }
);

module.exports = Portfolio;
