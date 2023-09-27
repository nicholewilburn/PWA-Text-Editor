const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// Define the InjectManifest plugin instance
const workboxPlugin = new InjectManifest({
  swSrc: './src/service-worker.js',
  swDest: 'service-worker.js',
});

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'), // Make sure it points to the correct path
    },
    plugins: [
      // Generate HTML files for your entry points
      new HtmlWebpackPlugin({
        template: './index.html', // Update the path to your HTML template
        filename: 'index.html', // Output filename
      }),
      workboxPlugin,
    

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
            src: path.resolve(__dirname, 'src/images/logo.png'), // Verify this path
            sizes: [192, 256, 384, 512],
            destination: path.join('icons', 'ios'),
          },
        ],
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