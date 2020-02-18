const { gql } = require('apollo-server');

const typeDefs = gql`

  type Query {
    me: FindMeResponse!
    portfolio(userId: ID!): Portfolio
    stock(symbol: String!): Stock
  }

  type Mutation {
    signup(input: UserAccountInput!): UserAccountResponse
    login(input: UserAccountInput!): UserAccountResponse
  }

  input UserAccountInput {
    email: String!
    password: String!
  }

  type User {
    id: ID!
    firstName: String
    lastName: String
    email: String!
    password: String!
    portfolio: Portfolio
  }

  type UserAccountResponse {
    user: User
    token: String
  }

  type FindMeResponse {
    user: User
    loggedIn: Boolean!
  }

  type Portfolio {
    id: ID!
    stocks: [Stock]
    balance: Float!
  }

  type UserStock {
    id: ID!
    shares: Int!
    company: Company!
  }

  type Stock {
    symbol: String!
    company: Company!
    price: Float!
  }

  type Company {
    id: ID!
    name: String!
    ticker: String!
  }

  type Transaction {
    id: ID!
    stock: Stock!
    quantity: Int!
    price: Float!
  }

`;


module.exports = typeDefs;
