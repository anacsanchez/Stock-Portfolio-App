const { ForbiddenError } = require('apollo-server-express');

module.exports = {
    Query: {
        getMe: async(_, __, { user }) => {
            return !user ? { user: null, loggedIn: false} : { user, loggedIn: true };
        },
        getStock: async(_, { symbol: inputSymbol}, { dataSources }) => {
            const stockAPIResponse = await dataSources.StockAPI.getStock(inputSymbol);
            return stockAPIResponse;
        },
        getStocks: async(_, { symbols: inputSymbols}, { dataSources }) => {
            const stocksAPIResponse = await dataSources.StockAPI.getStocks(inputSymbols);
            return stocksAPIResponse;
        },
        getPortfolio: async(_, __, { user, dataSources }) => {
            if (!user) {
                throw new ForbiddenError('User must be logged in');
            }
            const { balance, userStocks, id } = await dataSources.PortfolioAPI.getPortfolio();
            if(!userStocks || !userStocks.length) {
                return { portfolio: { id, balance, stocks: userStocks }, success: true, message: ''};
            }
            const { stocks, success, message } = await dataSources.StockAPI.mapCurrentPricesToStocks(userStocks);
            return { portfolio: { id, balance, stocks }, success, message};
        },
        getPortfolioTransactions: async(_, __, { user, dataSources }) => {
            if (!user) {
                throw new ForbiddenError('User must be logged in');
            }
            const transactions = await dataSources.PortfolioAPI.getPortfolioTransactions();
            return transactions;
        }
    },
    Mutation: {
        signup: async(_, { input: userInput }, { dataSources }) => {
            const newUser = await dataSources.UserAPI.signupUser(userInput);
            if (!newUser.success) {
                throw newUser.message;
            }
            return newUser;
        },
        login: async(_, { input: userInput }, { dataSources }) => {
            const currentUserResponse = await dataSources.UserAPI.loginUser(userInput);
            if (!currentUserResponse.success) {
                throw currentUserResponse.message;
            }
            return currentUserResponse;
        },
        buyStock: async(_, { input: transactionInput}, { user, dataSources }) => {
            if (!user) {
                throw new ForbiddenError('User must be logged in');
            }
            const buyStockAPIResponse = await dataSources.PortfolioAPI.buyStock(transactionInput);
            if (!buyStockAPIResponse.success) {
                throw buyStockAPIResponse.message;
            }
            return buyStockAPIResponse;
        }
    }
};
