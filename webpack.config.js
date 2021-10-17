const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { webpack } = require('webpack');
const Dotenv = require('dotenv-webpack');

module.exports = {
	mode: 'development',
  entry: './src/index.js',
	devtool: 'inline-source-map',
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Weather App'
		}),
		new Dotenv()
	],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
		clean: true
  },
	module: {
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
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader']
			}
		]
	}
};
