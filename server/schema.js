const { gql } = require('apollo-server');

const typeDefs = gql`

  type Query {
    getMe: FindMeResponse!
    getStock(symbol: String!): GetStockResponse
    getPortfolioTransactions: GetPortfolioTransactionsResponse
    getPortfolio: GetPortfolioResponse
    getStocks(symbols:[String!]): GetStocksResponse
  }

  type Mutation {
    signup(input: UserAccountInput!): UserAccountResponse
    login(input: UserAccountInput!): UserAccountResponse
    buyStock(input: BuyStockInput!): BuyStockResponse
  }

  "User Schema"

  type User {
    id: ID!
    firstName: String
    lastName: String
    email: String!
    password: String!
    portfolio: Portfolio
  }

  input UserAccountInput {
    email: String!
    password: String!
  }

  type UserAccountResponse {
    user: User
    token: String
    success: Boolean!
    message: String
  }

  type FindMeResponse {
    user: User
    loggedIn: Boolean!
  }

  "Stock API Schema"

  type Stock {
    symbol: String!
    company: String!
    price: Float!
  }

  type GetStockResponse {
    stock: Stock
    success: Boolean!
    message: String
  }

  type GetStocksResponse {
    stocks: [Stock]
    success: Boolean!
    message: String
  }

  "Portfolio/UserStock Schema"

  type Portfolio {
    id: ID!
    stocks: [UserStock]
    balance: Float!
  }

  type UserStock {
    id: ID!
    shares: Int!
    symbol: String!
    companyName: String!
    currentUnitPrice: Float
  }

  type Transaction {
    id: ID!
    symbol: String!
    quantity: Int!
    price: Float!
    companyName: String!
  }

  type GetPortfolioResponse {
    portfolio: Portfolio
    success: Boolean!
    message: String
  }

  type GetPortfolioTransactionsResponse {
    transactions: [Transaction]
    success: Boolean!
    message: String
  }

  input BuyStockInput {
    symbol: String!
    price: Float!
    companyName: String!
    quantity: Int!
  }

  type BuyStockResponse {
    stock: UserStock
    success: Boolean!
    message: String
  }

`;

module.exports = typeDefs;
