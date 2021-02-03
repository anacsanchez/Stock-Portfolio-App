module.exports = {
  stories: [
	'../stories/*.stories.[tj]s',
	'../stories/*/*.stories.[tj]s'
  ],
  addons: [
	'@storybook/addon-essentials',
    '@storybook/addon-storysource',
    '@storybook/addon-a11y',
	'storybook-dark-mode'
  ],
};
