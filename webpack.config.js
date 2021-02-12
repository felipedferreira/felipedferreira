const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
    entry: {
        prototypes: path.resolve(__dirname, 'src', 'Util', 'prototypes.ts'),
        main: path.resolve(__dirname, 'src', 'index.tsx')
    },
    output: {
        filename: '[name].bundle.js'
    },
    devServer: {
        compress: false,
        open: true,
        hot: true,
        port: 3000
    },
    devtool: 'source-map',//inline-source-map
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                type: 'asset/resource',
            },
        ]
    },
    experiments: {
        asset: true
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
    },
    optimization: {
        splitChunks: { chunks: "all" }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src", "index.html"),
            favicon: path.resolve(__dirname, 'src', 'favoriteIcon.ico'),
            title: 'Felipes Portfolio'
        })
    ]
};