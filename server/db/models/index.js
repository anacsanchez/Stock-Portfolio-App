const Portfolio = require('./Portfolio');
const User = require('./User');
const UserStock = require('./UserStock')
const Company = require('./Company');
const Transaction = require('./Transaction');

User.hasOne(Portfolio);
Portfolio.belongsTo(User);
Portfolio.hasMany(UserStock);
Transaction.belongsTo(Portfolio);
Transaction.belongsTo(Company);

module.exports = {
  User,
  Portfolio,
  UserStock,
  Company,
  Transaction
};
