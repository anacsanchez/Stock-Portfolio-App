import React from 'react';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import '../client/public/style.css';
import { LoginForm, Stock } from '../client/components';

export default {
  title: 'Stock Portfolio App',
  decorators: [withKnobs, withA11y],
  backgrounds: [
    { name: 'light blue', value: '#00aced' }
  ]
};

// export const withCardInputField = () => <CardInputField isDisabled={boolean("Disabled", false)} />

export const withLoginForm = () => <LoginForm />

export const withStock = () => <Stock stock={
  {
    "id": 1,
    "companyName": "apple",
    "currentUnitPrice": 18,
    "symbol":"aapl"
  }
}/>

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

// export const withNewCard = () => <NewCard />
