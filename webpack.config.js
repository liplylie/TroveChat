const path = require('path');

const webpackConfig = {
  entry: path.resolve(__dirname, './client/src/index.js'),
  output: {
    path: path.resolve(__dirname, './client/static'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devtool: 'inline-source-map',
};

webpackConfig.module.loaders.push({
  test: /\.js[x]?$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
  options: { presets: ['es2015', 'react']},
});

webpackConfig.module.loaders.push({
  test: /\.(css)$/,
  loaders: ['style-loader', 'css-loader'],
});

// webpackConfig.module.loaders.push({
//   rules: [
//     {
//       test: /\.(png|jpg|gif)$/,
//       use: [
//         {
//           loader: 'file-loader',
//           options: {}  
//         }
//       ]
//     }
//   ]
// });

webpackConfig.module.loaders.push({
  test: /\.(png|jpg|gif)$/,
  loader: 'file-loader',
  options: {}  
});



module.exports = webpackConfig;
