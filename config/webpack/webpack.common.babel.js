import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';

import paths from './paths';

module.exports = () => ({
    entry: paths.entryPath,
    output: {
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                exclude: {
                    or: [
                        /node_modules/,
                        path.join(paths.root, 'src', 'index.html'),
                    ],
                },
                loader: "html-loader",
            },
            {
                test: /\.css/,
                use: [
                    { loader: 'style-loader' },
                    {
                      loader: 'css-loader',
                      options: {
                        modules: {
                            localIdentName:'[name]__[local]--[hash:base64:5]',
                        },
                        sourceMap: true,
                      },
                    },
                ],
            },
            {
                test: /(\.js|\.jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.ts|tsx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',
                },
            },
            // {
            //     test: /\.json$/,
            //     exclude: /node_modules/,
            //     loader: 'json-loader',
            // },
            {
                test: /\.less$/,
                include: /node_modules/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader', // translates CSS into CommonJS
                    },
                    {
                        loader: 'less-loader', // compiles Less to CSS
                        options: {
                            modifyVars: {
                                // 'primary-color': '#1DA57A',
                                // 'link-color': '#1DA57A',
                                // 'border-radius-base': '2px',
                                // or
                                // 'hack': `true; @import "your-less-file-path.less";`, // Override with less file
                            },
                            javascriptEnabled: true,
                        },
                    },
                ],
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                exclude: /node_modules/,
                loader: 'file-loader'
            },
            {
                test: /\.(woff|woff2)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            prefix: 'font',
                            limit: 5000,
                        }
                    },
                ],
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            mimetype: 'application/octet-stream',
                            limit: 10000,
                        },
                    },
                ],
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                        },
                    },
                    {
                        loader: 'img-loader',
                    },
                ],
            }
        ],
    },
    resolve: {
        modules: ['src', 'node_modules'],
        extensions: ['*', '.js', '.jsx', '.ts', '.tsx', '.scss', '.css'],
        alias: {
            '~': path.resolve(paths.root, 'src/') // added this: ts alias import
        },
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({
            template: paths.templatePath,
            minify: {
                collapseInlineTagWhitespace: true,
                collapseWhitespace: true,
                preserveLineBreaks: true,
                minifyURLs: true,
                removeComments: true,
                removeAttributeQuotes: false
            }
        })
    ]
});
