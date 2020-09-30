const path = require('path')
const MinifyPlugin = require('babel-minify-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	mode: 'development',
	devtool: 'source-map',
	context: path.resolve(__dirname, 'src'),
	entry: ['./main.js', './main.scss'],
	output: {
		path: path.resolve(__dirname, 'public')
	},
	module: {
		rules: [{
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		},
			{
				test: /\.(scss|css)/,
				exclude: /node_modules/,
				use:[
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							reloadAll: true
						}
					},
					'css-loader',
					'postcss-loader',
					'sass-loader'
				]
			}
		]
	},
	plugins: [
		new MinifyPlugin({}, {
			comments: false
		}),
		new MiniCssExtractPlugin({
			filename: '[name].css'
		}),
		new BrowserSyncPlugin({
			host: 'localhost',
			port: 3001,
			proxy: 'http://localhost:3000',
			files: [
				'public/views',
				'/routes'
			],
			// server: {baseDir: ['public']}
		}),
		new HtmlWebpackPlugin({
			title: 'Home',
			template: 'html/index.html',
			filename: 'views/index.html',
			minify: false
		}),
		new HtmlWebpackPlugin({
			title: 'About',
			template:'html/about.html',
			filename: 'views/about.html',
			minify: false
		}),
		new HtmlWebpackPlugin({
			title: 'Error',
			template:'html/error.html',
			filename: 'views/error.html',
			minify: false,
			templateParameters: {
				message: '<%= message %>',
				status: '<%= status %>'
			}
		})
	]
}
