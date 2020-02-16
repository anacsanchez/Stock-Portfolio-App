const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    password: String!
    portfolio: Portfolio!
  }

  type Portfolio {
    id: ID!
    stocks: [Stock]
    balance: Int!
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
    stock: [Stock]
    quantity: Int!
    price: Int!
  }
`;


module.exports = typeDefs;
