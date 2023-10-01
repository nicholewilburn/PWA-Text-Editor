const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { WorkboxPlugin } = require('workbox-webpack-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');

// Define the WorkboxPlugin instance
// const workboxPlugin = new WorkboxPlugin.InjectManifest({
//   swSrc: './src/service-worker.js',
//   swDest: 'service-worker.js',
// });

module.exports = {
  mode: 'development', // or 'production' if you prefer
  entry: {
    main: './src/js/index.js',
    install: './src/js/install.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
    }),
    new WebpackPwaManifest({
      name: 'Your Text Editor',
      short_name: 'Text Editor',
      description: 'A text editor application.',
      background_color: '#ffffff',
      theme_color: '#007bff',
      start_url: '/',
      icons: [
        {
          src: path.resolve(__dirname, 'src/images/logo.png'),
          sizes: [192, 256, 384, 512],
          destination: path.join('icons', 'ios'),
        },
      ],
    }),
    new InjectManifest({
      swSrc: './src/service-worker.js', // Path to your service worker file
      swDest: 'service-worker.js',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
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
