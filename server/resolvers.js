const { ForbiddenError } = require('apollo-server');

module.exports = {
  Query: {
    me: async(_, __, { user }) => !user ? { user: null, loggedIn: false} : { user, loggedIn: true },
    getStock: async(_, { symbol: inputSymbol}, { dataSources }) => {
      const stockAPIResponse = await dataSources.StockAPI.getStock(inputSymbol);
      return stockAPIResponse;
    },
    getStocks: async(_, { symbols: inputSymbols}, { dataSources }) => {
      const stocksAPIResponse = await dataSources.StockAPI.getStocks(inputSymbols);
      return stocksAPIResponse;
    },
    getPortfolio: async(_, __, { user, dataSources }) => {
      if(!user) {
        throw new ForbiddenError('User must be logged in');
      }
      const { balance, userStocks } = await dataSources.PortfolioAPI.getPortfolio();
      const { stocks, success, message } = await dataSources.StockAPI.mapCurrentPricesToStocks(userStocks);
      return { portfolio: { balance, stocks }, success, message};
    },
    getPortfolioTransactions: async(_, __, { user, dataSources }) => {
      if(!user) {
        throw new ForbiddenError('User must be logged in');
      }
      const transactions = await dataSources.PortfolioAPI.getPortfolioTransactions();
      return transactions;
    }
  },
  Mutation: {
    signup: async(_, { input: userInput }, { dataSources }) => {
      const newUser = await dataSources.UserAPI.signupUser(userInput);
      const { user, token } = newUser;
      return { user, token };
    },
    login: async(_, { input: userInput }, { dataSources }) => {
      const currentUser = await dataSources.UserAPI.loginUser(userInput);
      const { user, token } = currentUser;
      return { user, token };
    },
    buyStock: async(_, { input: transactionInput}, { user, dataSources }) => {
      if(!user) {
        throw new ForbiddenError('User must be logged in');
      }
      const buyStockAPIResponse = await dataSources.PortfolioAPI.buyStock(transactionInput);
      return buyStockAPIResponse;
    }
  }
};
