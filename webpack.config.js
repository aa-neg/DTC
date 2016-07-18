var path = require('path')
var webpack = require('webpack')

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client?ult-arnolda-d:8080',
    './index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [ 'babel' ],
        exclude: /node_modules/,
        include: __dirname
      },
      // { test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery' },

      // // Needed for the css-loader when [bootstrap-webpack](https://github.com/bline/bootstrap-webpack)
      // // loads bootstrap's css.
      // { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,   loader: "url?limit=10000&minetype=application/font-woff" },
      // { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&minetype=application/octet-stream" },
      // { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: "file" },
      // { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&minetype=image/svg+xml" },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      },
      {
        test: /\.css$/,
        loader: "css-loader"
      }
    ]
  },
  devServer: {
    port: 8080,
    host: "ult-arnolda-d",
    inline: true
  }
}
