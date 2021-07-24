const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');

const config = {
  mode: 'development',
  entry: {
    app: './assets/js/index.js',
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].bundle.js',
  },
  plugins: [
    new WebpackPwaManifest({
      fingerprints: false,
      inject: false,
      name: 'Budget Tracker app',
      short_name: 'Budget Tracker',
      description: 'An application that allows you to track your withdrawals and deposits.',
      background_color: '#01579b',
      theme_color: '#ffffff',
      'theme-color': '#ffffff',
      start_url: '/',
      icons: [
        {
          src: path.resolve('assets/icons/icon-192x192.png'),
          sizes: [192, 512],
          destination: path.join('assets', 'icons'),
        },
      ],
    }),
  ],
    module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};

module.exports = config;
