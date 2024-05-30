const path = require('path');

module.exports = {

  entry: './src/index.js',

  output: {
    publicPath: '/',
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist'),
  },

  devServer: {
    static: {
      directory: path.join(__dirname, '../dist'),
    },
    compress: true,
    hot: true,
  },

  devtool: 'inline-source-map',

  mode: 'development',

  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
          },
        ],
      },
    ],
  },
};