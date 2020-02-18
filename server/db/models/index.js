const Portfolio = require('./Portfolio');
const User = require('./User');
const Stock = require('./Stock')
const Company = require('./Company');
const Transaction = require('./Transaction');

User.hasOne(Portfolio);
Portfolio.belongsTo(User);
Portfolio.hasMany(Stock);
Transaction.belongsTo(Portfolio);
Transaction.belongsTo(Company);

module.exports = {
  User,
  Portfolio,
  Stock,
  Company,
  Transaction
};
