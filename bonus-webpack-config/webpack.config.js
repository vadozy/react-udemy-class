const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'cheap-module-eval-source-map', // allows to debug orig code in browser
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        chunkFilename: '[name].chunk.js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.jsx'] // try to find files with this extension if no extension is given
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                exclude: /node_module/,
                use: [ // use is like loader with additional config
                    {loader: 'style-loader'}, // order of style-loader and css-loader is important
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1, // informs cssloader that postcss-loader runs before it
                            modules: true,
                            localIdentName: '[name]__[local]__[hash:base64:5]'
                        }
                    }, // webpack parses and applies loaders from right to left
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                autoprefixer({
                                    browsers: [
                                        "> 1%",
                                        "last 2 versions"
                                    ]
                                })
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'url-loader?limit=8000&name=images/[name].[ext]'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + '/src/index.html',
            filename: 'index.html',
            inject: 'body'
        })
    ]

};
