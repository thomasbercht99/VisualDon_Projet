const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const p1 = new HtmlWebpackPlugin({
    template: './public/index.html',
    filename: 'index.html',
    inject: 'body'
})
const p2 = new HtmlWebpackPlugin({
    template: './public/graphe.html',
    filename: 'graphe.html',
    inject: 'body'
})
module.exports = {
    name: 'browser',
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve('dist'),
        filename: 'index_bundle.js'
    },
    module: {
        rules: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            {
                test: /\.csv$/,
                loader: 'csv-loader',
                options: {
                  dynamicTyping: true,
                  header: true,
                  skipEmptyLines: true
                }
              }
        ]
    },
    plugins: [p1, p2]
}