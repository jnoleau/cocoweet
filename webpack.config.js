import path from 'path';
import webpack from 'webpack';

export default {
  debug: true,

  devtool: 'cheap-source-map',

  entry: [
    `webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr`,
    './app/index'
  ],

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    libraryTarget: 'commonjs2',
    publicPath: `http://localhost:3000/dist/`
  },

  module: {
    loaders: [{
      test: /\.js?$/,
      loaders: ['babel-loader'],
      include: path.join(__dirname, 'app')
    },
    {
      test: /\.(less|scss)$/,
      loaders: [
        'style-loader',
        'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
        'postcss-loader'
      ]
    },
    {
      test: /\.(png|jpg|jpeg|gif|woff|ico|json|svg)$/,
      loader: 'file?name=[path][name].[ext]'
    }
    ]
  },

  /* eslint-disable global-require */
  postcss: () => [
    require('postcss-import')({
      path: [
        path.join(__dirname, 'app')
      ]
    }),
    require('postcss-nested'),
    require('postcss-animation'),
    require('postcss-simple-vars')
  ],
  /* eslint-enable global-require */

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],

  resolve: {
    alias: {
      app: path.resolve('./app'),
      inherits: 'inherits/inherits_browser.js',
      superagent: 'superagent/lib/client',
      emitter: 'component-emitter'
    }
  },

  target: 'electron-renderer'
};
