const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const path = require("path");

module.exports = {
    mode: 'development',
    entry: [
        './src/js/main.js',
        './src/js/common/lib/index.js',
    ],
    output: {
        path: __dirname + '/dist',
        // path: path.resolve(__dirname, "dist"),
        filename: 'bundle.js',
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader, //3. extrac css into files
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.html$/,
                use: [ "html-loader"]
            },
            {
                test: /\.(jpg|png|svg)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name][ext]'
                },
            },
            {
                test: /\.svg/,
                type: 'asset/source',
            }
        ]
    }
}