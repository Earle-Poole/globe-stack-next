/** @type {import('next').NextConfig} */
const withPlugins = require('next-compose-plugins')
const withImages = require('next-images')
const webpack = require('webpack')

module.exports = withPlugins([[withImages]], {
  experimental: {
    //   concurrentFeatures: false,
    //   serverComponents: false,
  },
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
    loader: 'akamai',
    path: '/',
    disableStaticImages: true,
  },
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
  plugins: [
    // Work around for Buffer is undefined:
    // https://github.com/webpack/changelog-v5/issues/10
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
  compiler: {
    styledComponents: true,
  },
})
