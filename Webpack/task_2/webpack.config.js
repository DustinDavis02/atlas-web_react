const path = require('path');

module.exports = {
 entry: './js/dashboard_main.js',
 output: {
   filename: 'bundle.js',
   path: path.resolve(__dirname, 'public')
 },
 module: {
   rules: [
     {
       test: /\.css$/,
       use: ['style-loader', 'css-loader']
     },
     {
       test: /\.(png|svg|jpg|jpeg|gif)$/i,
       use: [
         {
           loader: 'file-loader',
           options: {
             name: '[path][name].[ext]',
           }
         },
         {
           loader: 'image-webpack-loader',
           options: {
             mozjpeg: {
               progressive: true,
               quality: 65
             },
           }
         }
       ]
     }
   ]
 },
 mode: 'production'
};