import React from 'react';
import { withKnobs, text, boolean, number, array } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import '../client/public/style.css';
import { UserForm, SingleStock, Login, Signup, Transactions, Portfolio, PurchaseStock, StockSearchForm, PurchaseStockForm, PortfolioStocks, Navbar } from '../client/components';
import apolloStorybookDecorator from "apollo-storybook-react";
import { BrowserRouter } from 'react-router-dom';
import { typeDefs } from './schema';
import { mocks } from './mocks';

export default {
  title: 'Stock Portfolio App',
  decorators: [
    withKnobs,
    withA11y,
    apolloStorybookDecorator({
      typeDefs,
      mocks
    })
  ],
  backgrounds: [
    { name: 'light blue', value: '#00aced' }
  ]
};

export const LoginSignupForm = () => <UserForm submitName={text("Button Name","Submit")} />

export const Stock = () => <SingleStock stock={
  {
    "id": 1,
    "companyName": "apple",
    "currentUnitPrice": 18,
    "symbol":"aapl",
    "shares": 2,
    "isUp":true
  }
}/>

export const LoginScreen = () => <Login />;

export const SignupScreen = () => <Signup />;

export const PortfolioScreen = () => <Portfolio />;

export const AllPortfolioStocks = () => <PortfolioStocks stocks={array('Stocks',
  [
    {
      id: 1,
      companyName: "apple",
      currentUnitPrice: 18,
      symbol:"aapl",
      shares: 2,
      isUp:true,
      __typename: "UserStock"
    },
    {
      id: 2,
      symbol: "HEAR",
      currentUnitPrice: 7.27,
      shares: 13,
      companyName: "Turtle Beach Corp.",
      isUp: false,
      __typename: "UserStock"
    }
  ]
)} />;

export const PurchaseStockSection = () => <PurchaseStock balance={number('Balance', 5000)} />

export const StockSearchInput = () => <StockSearchForm />

export const PurchaseQuantityForm = () => (
  <PurchaseStockForm
    isUp={boolean('Is Up',true)}
    currentUnitPrice={number('Current Unit Price', 14.49)}
    handleQuantitySubmit={() => 'submit quantity'}
    companyName={text('Company Name', 'apple')}
  />
);

export const NavbarTop = () => (
  <BrowserRouter>
    <Navbar isLoggedIn={ boolean('Is Logged In', true )} />
  </BrowserRouter>
);

export const EntireScreen = () => (
  <BrowserRouter>
    <Navbar isLoggedIn={ boolean('Is Logged In', true )} />
    <Portfolio />
  </BrowserRouter>
);
