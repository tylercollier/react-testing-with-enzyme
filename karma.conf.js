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
          },
          { test: /\.json$/, loader: 'json' }
        ],
        noParse: [/\/sinon\.js/]
      },
      resolve: {
        extensions: ["", ".js", ".jsx"],
        alias: {
          sinon: 'sinon/pkg/sinon'
        }
      },
      externals: {
        'cheerio': 'window',
        // I needed this for React 0.14. It doesn't seem to be needed for React 15, but it might be needed after I use enzyme's mount method, which I haven't used yet (in this repo).
        // 'react-dom/server': 'window',
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true,
        // See https://github.com/airbnb/enzyme/issues/47#issuecomment-207498885
        'react/addons': true
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
