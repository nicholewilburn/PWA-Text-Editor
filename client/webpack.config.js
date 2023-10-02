const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { GenerateSW } = require('workbox-webpack-plugin');

module.exports = {
  mode: 'development', // or 'production' if you prefer
  entry: {
    main: './src/js/index.js',
    install: './src/js/install.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'client', 'dist'),
  },
  plugins: [
    new GenerateSW({
      swDest: 'service-worker.js', // Output filename
      clientsClaim: true,
      skipWaiting: true,
    }),
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
          sizes: [96, 192, 256, 384, 512], // Include 96x96 size
          destination: path.join('assets', 'icons'), // Use 'assets/icons' as the destination
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





