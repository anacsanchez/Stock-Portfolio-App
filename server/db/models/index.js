const Portfolio = require('./Portfolio');
const User = require('./User');
const UserStock = require('./UserStock');
const Transaction = require('./Transaction');

User.hasOne(Portfolio);
Portfolio.belongsTo(User);
Portfolio.hasMany(UserStock, { as: 'userStocks'});
Transaction.belongsTo(Portfolio);
Portfolio.hasMany(Transaction);

module.exports = {
  User,
  Portfolio,
  UserStock,
  Transaction
};
