const path = require('path');

const srcPath = function(subdir) {
    return path.join(__dirname, "..", "src", subdir);
}

module.exports = {
	entry: './src/main.ts',
	target: 'node',
    devtool: 'inline-source-map',
	node: {
		fs: 'empty',
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		extensions: [ '.tsx', '.ts', '.jsx', '.js' ],
        alias: {
            Game: srcPath('Game'),
            PageServer: srcPath('PageServer'),
            SessionServer: srcPath('SessionServer')
        },
		modules: [
			'node_modules'
		]
	},
	output: {
		filename: 'server.js',
		path: path.resolve(__dirname, "..", "bin")
	},
};