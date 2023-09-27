const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// Define the InjectManifest plugin instance
const workboxPlugin = new InjectManifest({
  swSrc: './src/service-worker.js',
  swDest: 'service-worker.js',
});

module.exports = {
  mode: 'production',
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
    workboxPlugin,
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