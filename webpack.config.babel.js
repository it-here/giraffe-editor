/**
 * Created by Bane.Shi.
 * Copyright MoenSun
 * User: Bane.Shi
 * Blog: http://blog.fengxiaotx.com
 * Date: 2019-05-18
 * Time: 08:53
 */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin') ;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let config = {
    entry: './example/index.jsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    resolve:{
        modules: [path.resolve(__dirname, "src"), "node_modules"],
        extensions: ['.web.js', '.js', '.json','.jsx'],
    },
    module:{
        rules:[
            {
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                use:[
                    {
                        loader: 'babel-loader' ,
                        query:{
                            "presets":['@babel/env','@babel/react']
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use:[
                    { loader: MiniCssExtractPlugin.loader },
                    {
                        loader: "css-loader"
                    }
                ]
            },
            {
                test: /\.less$/,
                use:[
                    { loader: MiniCssExtractPlugin.loader },
                    { loader: 'css-loader' },
                    { loader: 'less-loader',
                        options:{
                            javascriptEnabled: true,
                            importLoaders: 1,
                            modules:true
                        }
                    },
                ]
            },
            {test: /\.(png|jpg|gif)$/,use:[{loader:'url-loader'}] },
            {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, use:[{loader:'url-loader'}]},
            {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, use:[{loader:'url-loader'}]},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, use:[{loader:'url-loader'}]},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, use:[{loader:'file-loader'}]},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, use:[{loader:'html-loader'}]},
        ]
    },
    devServer:{
        historyApiFallback: true,
        noInfo: false,
        port:3000,
        proxy:{
            "/admin-api/*": {
                target:"http://localhost:8400/",
                // target:"http://116.62.163.3:8301/",
                changeOrigin: true,
                secure: false,
                //pathRewrite: {'^/api' : ''}
            }
        }
    },
    plugins:[
        new webpack.ProvidePlugin({
            $ : 'jquery',
            jQuery : 'jquery',
            'window.Quill': 'quill/dist/quill.js',
            'Quill': 'quill/dist/quill.js'
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new HtmlWebpackPlugin({
            title:'ITHere',
            template: './example/index.ejs',
            inject : true,
            hash: true,
            minify: {
                collapseWhitespace: true,
                collapseBooleanAttributes: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true
            }
        })
    ]
};

module.exports = config;
