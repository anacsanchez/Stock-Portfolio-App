import React from 'react';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import '../client/public/style.css';
import { UserForm, SingleStock, Login, Signup, AllTransactions, Portfolio } from '../client/components';
import apolloStorybookDecorator from "apollo-storybook-react";
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

export const LoginScreen = () => <Login />

export const SignupScreen = () => <Signup />

export const PortfolioScreen = () => <Portfolio />;

// export const withAllCards = () => <AllCardsView cards={[
//   {
//     "id": 1,
//     "prompt": "What is scope?",
//     "answer": "Scope is a set of rules that determines where a program can access data.",
//     "isDraft": true,
//     "createdAt": "2020-02-02T18:38:35.986Z",
//     "updatedAt": "2020-02-02T18:38:35.986Z",
//     "userId": null
//   },
//   ]} />
