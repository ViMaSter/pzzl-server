const path = require('path');

const srcPath = function(subdir) {
    return path.join(__dirname, "..", "src", subdir);
}

module.exports = {
	entry: './src/main.ts',
    devtool: 'inline-source-map',
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
		extensions: [ '.tsx', '.ts', '.js' ],
        alias: {
            util: srcPath('util'),
            game: srcPath('game')
        }
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, "..", "..", "server", "html", "js")
	},
};