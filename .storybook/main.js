module.exports = {
  stories: [
    '../stories/*.stories.[tj]s'
  ],
  addons: [
    '@storybook/addon-storysource',
    '@storybook/addon-actions/register',
    '@storybook/addon-knobs/register',
    '@storybook/addon-a11y/register',
    '@storybook/addon-backgrounds/register',
    '@storybook/addon-viewport/register',
    '@storybook/addon-docs'
  ],
};
