const { gql } = require('apollo-server');

const typeDefs = gql`

  type Query {
    me: User
    portfolio(userId: ID!): Portfolio
  }

  type Mutation {
    signup(input: CreateUserInput!): User
  }

  input CreateUserInput {
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

  type Portfolio {
    id: ID!
    stocks: [Stock]
    balance: Float!
  }

  type Stock {
    id: ID!
    shares: Int!
    company: Company!
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
