const path = require('path')
const MinifyPlugin = require('babel-minify-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin')

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
			reload: false
			// server: {baseDir: ['public']}
		}),
		new HtmlWebpackPlugin({
			template: 'html/index.html',
			filename: 'views/index.html',
			minify: false,
			templateParameters: {
				title: '<%= title %>',
			}
		}),
		new HtmlWebpackPlugin({
			template:'html/about.html',
			filename: 'views/about.html',
			minify: false,
			templateParameters: {
				title: '<%= title %>',
			}
		}),
		new HtmlWebpackPlugin({
			template:'html/error.html',
			filename: 'views/error.html',
			minify: false,
			templateParameters: {
				title: 'Error Page',
				mesage: '<%= message %>',
				status: '<%= error.status %>',
				stack: '<%= error.stack %>'
			}
		}),
		new HtmlWebpackPlugin({
			template:'html/scripts.html',
			filename: 'views/scripts.html',
			minify: false,
			templateParameters: {
				title: 'Scripts'
				// message: '<%= message %>',
				// status: '<%= status %>'
			}
		}),
		new HtmlWebpackPartialsPlugin({
			path: path.resolve(__dirname, 'src/html/partials/navbar.html'),
			location: 'navbar',
			template_filename: [
				'views/index.html',
				'views/about.html',
				'views/error.html',
				'views/scripts.html'
			]
		})
	]
}
