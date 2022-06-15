const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    mode: 'development',
    entry: {
        script: path.resolve(__dirname, './src/js/main.js')
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js',
        clean: true,
        assetModuleFilename: 'assets/[name][ext][query]'
    },
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|jpeg)$/i,
                type: 'asset/resource'
            }, {
                test: /\.html$/,
                use: 'html-loader'
            }, {
                test: /\.(scss|sass)$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: { publicPath: '' }
                    },
                    'css-loader',
                    'sass-loader'
                ]
            }, {
                exclude: /node_modules/,
                test: /\.(jsx?)$/,
                use: 'babel-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css'
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx']
    },
    devtool: 'source-map',
    devServer: {
        static: {
            directory: path.resolve(__dirname, './dist')
        },
        port: 3000,
        hot: true,
        compress: true
    }
}