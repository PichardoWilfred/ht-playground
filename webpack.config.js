const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: [
        __dirname + '/src/js/main.js',
        __dirname + '/src/scss/main.scss'
    ],
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [ "style-loader", "css-loader"]
            },
            {
                test: /\.s[ac]ss$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    "css-loader",
                    "sass-loader"
                ]
            },
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './src/views/home.html' 
        }),
        new MiniCssExtractPlugin({
            filename: 'main.css' 
        }),
    ],
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },
}