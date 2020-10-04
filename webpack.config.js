const path = require('path')
const fs = require('fs')
const Scripts = require('./src/core/Scripts')

const MinifyPlugin = require('babel-minify-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin')

const scriptsPages= ['calculator', 'todos']
scriptsPages.forEach(page => {
	const block = new Scripts(page)
	const script = block.getBlock().then(data => {
		console.log('webpack:', data)
	})
});


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
		pagesPlugin('index', {
			title: 'Главная страница',
			message: ''
		}),
		pagesPlugin('about', {
			title: 'AboutPage',
			message: ''
		}),
		partialsPlugin(), scriptsPlugin()
	]
}

function pagesPlugin(page, templateParameters) {
	const title = templateParameters.title
	const message = templateParameters.message
	return new HtmlWebpackPlugin({
			template: 'navPages/' + page + '.html',
			filename: 'views/' + page + '.html',
			minify: false,
			templateParameters: {
				title: title,
				message: message,
			}
		})
}

function partialsPlugin() {
	return new HtmlWebpackPartialsPlugin({
			path: path.resolve(__dirname, 'src/navPages/partials/navbar.html'),
			location: 'navbar',
			template_filename: [
				'views/index.html',
				'views/about.html',
				'views/error.html',
				'views/scripts.html'
			]
		})
}

function scriptsPlugin() {
	const script =  new HtmlWebpackPlugin({
		template:'navPages//scripts.html',
		filename: 'views/scripts.html',
		minify: false,
		templateParameters: {
			title: 'Scripts',
			message: 'ggg',
			code: scriptsCode()
			// status: '<%= status %>'
		}
	})
	return script
}

function scriptsCode() {
	return [
		{
			id: 'id_1',
			hlml: 'html',
			htmlCode: 'htmlCode',
			css: 'css',
			js: 'js'
		},
		{
			id: 'id_2',
			hlml: 'html_2',
			htmlCode: 'htmlCode_2',
			css: 'css_2',
			js: 'js_2'
		}
	]
}
