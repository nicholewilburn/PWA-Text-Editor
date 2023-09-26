const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // Generate HTML files for your entry points
      new HtmlWebpackPlugin({
        template: './client/index.html', // Update the path to your HTML template
        filename: 'index.html', // Output filename
      }),

      // Generate a manifest file
      new WebpackPwaManifest({
        name: 'Your Text Editor',
        short_name: 'Text Editor',
        description: 'A text editor application.',
        background_color: '#ffffff',
        theme_color: '#007bff',
        start_url: '/',
        icons: [
          {
            src: path.resolve('src/images/icon.png'),
            sizes: [192, 256, 384, 512],
            destination: path.join('icons', 'ios'),
          },
        ],
      }),

      // Configure service worker using Workbox
      new InjectManifest({
        swSrc: './src/service-worker.js', // Specify the path to your service worker file
        swDest: 'service-worker.js', // Output service worker filename
      }),
    ],

    module: {
      rules: [
        // Add CSS loaders and Babel configuration here
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
};