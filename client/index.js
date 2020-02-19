import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import gql from 'graphql-tag';

const cache = new InMemoryCache();
const link = new HttpLink({
    uri: "http://localhost:4000/graphql"
});

const client = new ApolloClient({
    cache,
    link
});

// client.query({
//     query: gql`
//     query GetStocks($symbols:[String!]) {
//     getStocks(symbols: $symbols) {
//         stocks {
//         symbol
//         price
//         }
//         success
//         message
//     }
//     }
//     `,
//     variables: {
//         "symbols": ["aalz","twtr"]
//     }
// })
// .then(result => console.log(result))
// .catch(err => console.log(err))

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
,document.getElementById('app'));
