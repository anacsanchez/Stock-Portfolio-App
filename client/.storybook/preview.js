import { addDecorator } from '@storybook/react';
import { withConsole } from '@storybook/addon-console';
import { typeDefs, scalars } from '../../src/schema';
import { mocks } from '../stories/mocks';
import apolloStorybookDecorator from "apollo-storybook-react";
import '@storybook/addon-console';

export const decorators = [
	apolloStorybookDecorator({
		typeDefs,
		resolvers: {...scalars},
		mocks
	})
]

addDecorator((storyFn, context) => withConsole()(storyFn)(context));

