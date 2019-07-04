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
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

let config = {
    entry: {
        "giraffe-editor": './src/GiraffeEditor.jsx'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        library: 'GiraffeEditor',
        libraryTarget: 'umd'
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
            {test: /\.(png|jpg|gif)$/,use:[{loader:'url-loader'}] },
            {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, use:[{loader:'url-loader'}]},
            {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, use:[{loader:'url-loader'}]},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, use:[{loader:'url-loader'}]},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, use:[{loader:'file-loader'}]},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, use:[{loader:'html-loader'}]},
        ]
    },
    plugins:[
        new webpack.ProgressPlugin(),
        new CleanWebpackPlugin(),
        new webpack.ProvidePlugin({
            'window.Quill': 'quill',
            'Quill': 'quill'
        })
    ],
    externals : {
        'react': {
            'commonjs': 'react',
            'commonjs2': 'react',
            'amd': 'react',
            'root': 'React'
        },
        'react-dom': {
            'commonjs': 'react-dom',
            'commonjs2': 'react-dom',
            'amd': 'react-dom',
            'root': 'ReactDOM'
        },
        'react-dom/server': {
            'commonjs': 'react-dom/server',
            'commonjs2': 'react-dom/server',
            'amd': 'react-dom/server',
            'root': 'ReactDOMServer'
        },
        'prop-types': {
            'commonjs': 'prop-types',
            'commonjs2': 'prop-types',
            'amd': 'prop-types',
            'root': 'PropTypes'
        }
    }
};

module.exports = config;
