const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const db = require('../db');

const User = db.define('user', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    hooks: {
      beforeCreate: async (user) => {
        if(user.password) {
          try {
            const hash = await(bcrypt.hash(user.password));
            user.password = hash;
          } catch(err) {
            throw new Error(err);
          }
        }
      }
    }
  }
);

module.exports = User;
