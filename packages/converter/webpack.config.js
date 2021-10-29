//import { resolve as pathResolve } from 'path';//= require('path').resolve;
const pathResolve = require('path').resolve;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
    target: 'node',
    entry: {
        './assets/test2': './assets/test.md',
        './assets/test3': './assets/test copy.md'
    },
    output: {
        filename: '[name].[hash].json',
        path: pathResolve('./dist'),
    },
    module: {
        rules: [
            {
                // Only apply these loaders to manifest.json.
                test: /\.md$/i,
                // Loaders are applied in reverse order.
                use: [
                    "json-loader",
                    {
                        loader: pathResolve('./test.js'),
                    },
                    {
                        loader: '@liesmich/block-loader'
                    }
                ]
            }, {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [/*
                    {
                        loader: 'file-loader',
                        options: {
                            name: '/public/icons/[name].[contenthash].[ext]'
                        }
                    },*/
                    {
                        loader: 'responsive-loader',
                        options: {
                            adapter: require('responsive-loader/sharp'),
                            name: '[path]/[name]/[hash]-[width].[ext]',
                            outputPath: '/public/images/',
                            esModule: true,
                            sizes: [320, 640, 960, 1280, 1600, 1920],
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
    ],
}
