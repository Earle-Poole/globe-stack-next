const path = require('path')
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin')

module.exports = {
  stories: ['../components/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', 'storybook-dark-mode'],
  framework: '@storybook/react',
  core: {
    builder: 'webpack5',
  },
  webpackFinal: async (config) => {
    config.resolve.plugins = [
      new TsconfigPathsPlugin({ extensions: config.resolve.extensions }),
    ]
    config.resolve.modules = [
      path.resolve(__dirname, "/"),
      "node_modules",
    ]
    config.resolve.alias = {
      ...config.resolve.alias,
      "@/static/*": path.resolve(__dirname, "public/static/*"),
      "@/components/*": path.resolve(__dirname, "components/*"),
      "@/atoms/*": path.resolve(__dirname, "components/atoms/*"),
      "@/molecules/*": path.resolve(__dirname, "components/molecules/*"),
      "@/organisms/*": path.resolve(__dirname, "components/organisms/*"),
      "@/templates/*": path.resolve(__dirname, "components/templates/*"),
      "@/pages/*": path.resolve(__dirname, "pages/*"),
      "@/utils/*": path.resolve(__dirname, "utils/*"),
      "@/constants/*": path.resolve(__dirname, "utils/constants/*"),
    };
    return config
  },
  typescript: { reactDocgen: false },
}
