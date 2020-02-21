import { addParameters, addDecorator } from '@storybook/react';
import { withConsole } from '@storybook/addon-console';
import '@storybook/addon-console';

addParameters({
  backgrounds: [
    { name: 'white', value: '#ffffff', default: true },
  ],
});

addDecorator((storyFn, context) => withConsole()(storyFn)(context));
