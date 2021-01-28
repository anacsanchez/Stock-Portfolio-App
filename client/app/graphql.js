import gql from 'graphql-tag';

/* Client */

export const IS_LOGGED_IN = gql `
    query isLoggedIn {
        isLoggedIn @client
    }
`;

/* Queries */

export const GET_PORTFOLIO = gql`
    query GetPortfolio {
        getPortfolio {
            portfolio {
                id
                stocks {
                    id
                    symbol
                    currentUnitPrice
                    shares
                    companyName
                    isUp
                }
                balance
            }
        }
    }
`;

export const GET_STOCK = gql`
    query GetStock($symbol:String!) {
        getStock(symbol: $symbol) {
            stock {
                symbol
                currentUnitPrice
                companyName
            }
            success
            message
        }
    }
`;

export const GET_TRANSACTIONS = gql`
    query GetPortfolioTransactions {
        getPortfolioTransactions {
            transactions {
                id
                quantity
                total
                symbol
                companyName
            }
            success
        }
    }
`;

/* Mutations */

export const LOGIN_USER = gql`
    mutation Login($user: UserAccountInput!) {
        login(input: $user) {
            user {
                id,
                portfolio {
                    id
                    balance
                }
            },
            token
        }
    }
`;

export const SIGNUP_USER = gql`
    mutation Signup($user: UserAccountInput!) {
        signup(input:$user) {
            token
        }
    }
`;

export const BUY_STOCK = gql`
    mutation BuyStock($stock: BuyStockInput!) {
        buyStock(input: $stock) {
            stock {
                symbol
                shares
                companyName
            }
        }
    }
`;
