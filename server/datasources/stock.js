const { RESTDataSource } = require('apollo-datasource-rest');
const { UserInputError } = require('apollo-server');

class StockAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://sandbox.iexapis.com/stable';
  }

  willSendRequest(request) {
    request.params.set('token', process.env.PRICING_API_TOKEN);
  }

  stockReducer(stock) {
    return {
      symbol: stock.symbol,
      companyName: stock.companyName,
      currentUnitPrice: stock.latestPrice ? +Number.parseFloat(stock.latestPrice).toFixed(2) : 0,
      isUp: stock.changePercent && stock.changePercent > 0
    };
  }

  //TODO: Switch to class Error methods, such as didReceiveError
  async getStock(symbol) {
      const response = await this.get(`stock/${symbol}/quote`);
      const stock = this.stockReducer(response);
      return { stock, success: true, message: ''};
  }

  async getStocks(symbols) {
    const response = await this.get(`stock/market/batch`, { symbols: symbols.join(), types: "quote" });
    const stocks = Object.keys(response).map((symbol) => this.stockReducer(response[symbol].quote));
    return { stocks, success: true, message: ''};
  }

  async mapCurrentPricesToStocks(stocks) {
    try {
      const stocksBySymbolsObj = stocks.reduce((stocksObj, currStock) => ({ [currStock.symbol]: currStock, ...stocksObj }), {});
      const symbolsArr = Object.keys(stocksBySymbolsObj);
      const response = await this.get(`stock/market/batch`, { symbols: symbolsArr.join(), types: "quote" });
      const stocksWithCurrentPrices = symbolsArr.map(symbol => {
        const stockFromAPI = this.stockReducer(response[symbol.toUpperCase()].quote);
        stocksBySymbolsObj[symbol].setDataValue('currentUnitPrice', stockFromAPI.currentUnitPrice);
        stocksBySymbolsObj[symbol].setDataValue('isUp', stockFromAPI.isUp);
        return stocksBySymbolsObj[symbol].get();
      });
      return { stocks: stocksWithCurrentPrices, success: true, message: ''};
    } catch(err) {
      throw(err);
    }
  }
}

module.exports = StockAPI;
