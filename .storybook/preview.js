import { addParameters, addDecorator, configure } from '@storybook/react';
import { withConsole } from '@storybook/addon-console';
// import apolloStorybookDecorator from "apollo-storybook-react";
import '@storybook/addon-console';

addParameters({
  backgrounds: [
    { name: 'white', value: '#ffffff', default: true },
  ],
});

addDecorator((storyFn, context) => withConsole()(storyFn)(context));

// addDecorator(apolloStorybookDecorator({
// mocks: {},
// resolvers: {}
// }))
