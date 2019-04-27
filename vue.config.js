'use strict';
const plugins = require('./config/webpack.plugins');

module.exports = {
	devServer: {
		host: 'local.willand.co'
	},
	configureWebpack: {
		plugins: [ ...plugins ]
	}
}