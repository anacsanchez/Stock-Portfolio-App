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
      unique: true,
      validate: {
        isEmail: true
      },
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    hooks: {
      beforeValidate: async(user) => {
        if(user.password) {
          try {
            const hash = await(bcrypt.hash(user.password, +process.env.DB_SALT));
            user.password = hash;
          } catch(err) {
            console.log(err);
            throw new Error(err);
          }
        }
      }
    },
    underscored: true
  }
);

module.exports = User;
