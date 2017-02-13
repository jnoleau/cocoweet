require('babel-register');
const cocoweetWConfig = require('../webpack.config').default;

module.exports = {
  resolve: cocoweetWConfig.resolve,
  postcss: cocoweetWConfig.postcss,
  module: {
    loaders: cocoweetWConfig.module.loaders.slice(1)
  }
};
