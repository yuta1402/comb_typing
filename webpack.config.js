module.exports = {
	entry: './src/ts/main.ts',
	output: {
		filename: './dist/app.js'
	},
	resolve: {
		extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
	},
	module: {
		loaders: [
			{ test: /\.tsx?$/, exclude: /node_modules/, loader: 'ts-loader' }
		]
	},
	devServer: {
		contentBase: "./dist",
		port: 8000,
		cache: false,
		hot: false,
		inline: true,
		colors: true,
	}
}
