const { gql } = require('apollo-server');

const typeDefs = gql`

  type Query {
    me: User
    portfolio(userId: ID!): Portfolio
  }

  type Mutation {
    signup(user: User): String
  }

  type User {
    id: ID!
    firstName: String
    lastName: String
    email: String!
    password: String!
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
