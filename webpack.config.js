const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = (env) => {
  return {
    mode: 'development',
    entry: {
      app: './src/index.js',
    },
    output: {
      path: path.join(__dirname, '/dist/build'),
      filename: 'index.bundle.js',
      publicPath: '',
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.(scss|css)$/,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader'
          ]
        }
      ]
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          parallel: true,
          terserOptions: {
          },
        }),
      ],
    },
    plugins: [
      new Dotenv({
        path: `./config/.env${env.dev ? '.dev' : env.staging ? '.staging' : env.prod ? '.prod' : ''}`
      })
    ]
  };
};
