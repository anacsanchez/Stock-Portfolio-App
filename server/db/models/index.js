const Portfolio = require('./Portfolio');
const User = require('./User');
const Stock = require('./Stock')
const Company = require('./Company');
const Transaction = require('./Transaction');

User.hasMany(Stock, { through: Portfolio });
Portfolio.belongsTo(User);
Stock.hasOne(Company);
Transaction.belongsTo(User);
Transaction.hasOne(Company);

