var path = require('path');

module.exports = function(config) {
  return config.set({
    basePath: '',
    frameworks: ['mocha', 'sinon-chai'],
    files: ['spec/app/**'],
    preprocessors: {
      'spec/app/**': ['webpack', 'sourcemap']
    },
    webpack: {
      devtool: 'source-map',
      module: {
        loaders: [
          {
            test: /\.jsx?$/,
            loader: 'babel',
            exclude: path.resolve(__dirname, 'node_modules')
          }
        ],
        noParse: [/\/sinon\.js/]
      },
      resolve: {
        extensions: ["", ".js", ".jsx"],
        alias: {
          sinon: 'sinon/pkg/sinon'
        }
      }
    },
    webpackMiddleware: {
      noInfo: true
    },
    plugins: ['karma-phantomjs-launcher', 'karma-mocha', 'karma-sinon-chai', 'karma-sourcemap-loader', 'karma-webpack'],
    browsers: ['PhantomJS'],
    autoWatch: true
  });
};
