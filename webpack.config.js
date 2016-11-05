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
    }
    ]
  },

  postcss: () => {
    return [
      require('postcss-nested')
    ];
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],

  resolve: {
    alias: {
      cocoweet: path.resolve('./app')
    }
  },

  target: 'electron-renderer'
};
