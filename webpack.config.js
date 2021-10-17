const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { webpack } = require('webpack');
const Dotenv = require('dotenv-webpack');

module.exports = {
	mode: 'development',
  entry: {
		app: './src/index.js'
	},
	devtool: 'inline-source-map',
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Weather App'
		}),
		new Dotenv()
	],
  output: {
    filename: '[name].js',
    path: __dirname + '/dist',
		clean: true
  },
};

module = {
	rules: [
    {
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }
  ]
}
