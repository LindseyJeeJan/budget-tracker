const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');

const config = {
  mode: 'development',
  entry: {
    app: './public/assets/js/index.js',
    db: './public/assets/js/indexedDb.js',
  },
  output: {
    path: __dirname + '/public/dist',
    filename: '[name].bundle.js',
  },
  plugins: [
    new WebpackPwaManifest({
      fingerprints: false,
      inject: false,
      name: 'Budget Tracker app',
      short_name: 'Budget Tracker',
      description: 'An application that allows you to track your withdrawals and deposits.',
      background_color: '#ffffff',
      theme_color: '#317EFB',
      'theme-color': '#317EFB',
      start_url: '/',
      icons: [
        {
          src: path.resolve('public/assets/icons/icon-192x192.png'),
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
