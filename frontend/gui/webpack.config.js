'use strict';
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
var autoprefixer = require('autoprefixer');


module.exports = function (env) {
    const isProduction = env && env.production === false;

    return {
        context: path.resolve(__dirname, "src"),
        entry: './index.js',

        output: {
            path: path.resolve(__dirname, 'build'),
            filename: 'static/js/[name].[hash].js',
            publicPath: '/',
        },

        module: {
            loaders: [
                {
                    enforce: "pre",
                    test: /\.js$/,
                    include: path.resolve(__dirname, 'src'),
                    loader: "eslint-loader",
                    options: {
                        failOnError: true,
                        fix: true
                    }
                },
                {
                    test: /\.(js|jsx)$/,
                    include: path.resolve(__dirname, 'src'),
                    loader: 'babel-loader',
                    query: {
                        babelrc: false,
                        presets: [require.resolve('babel-preset-react-app')],
                    },
                },
                {
                    test: /\.css$/,
                    loader: isProduction ?
                        ExtractTextPlugin.extract({ fallback: 'style-loader', use: [
                            {
                                loader: require.resolve('css-loader')
                            },
                            {
                                loader: require.resolve('postcss-loader'),
                                options: {
                                    plugins: () => [
                                        require('postcss-flexbugs-fixes'),
                                        autoprefixer({
                                            browsers: [
                                                '>1%',
                                                'last 4 versions',
                                                'Firefox ESR',
                                                'not ie < 9',
                                            ],
                                            flexbox: 'no-2009',
                                        }),
                                    ],
                                },
                            }
                        ] }) :
                        [ 'style-loader', 'css-loader', ]
                },
                {
                    test: /\.json$/,
                    loader: 'json-loader',
                },
                {
                    test: /\.svg$/,
                    loader: 'file-loader',
                    query: {
                        name: 'static/media/[name].[hash:8].[ext]',
                    },
                },
            ],
        },
        plugins: [
            new InterpolateHtmlPlugin({
                PUBLIC_URL: '' // 用于替换 index.html 里面的 %PUBLIC_URL%
            }),
            new HtmlWebpackPlugin({
                inject: true,
                template: '../public/index.html',
                minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    keepClosingSlash: true,
                    minifyJS: true,
                    minifyCSS: true,
                    minifyURLs: true,
                },
            }),
            new ExtractTextPlugin('static/css/[name].[hash].css'),
            new webpack.HotModuleReplacementPlugin(), // 用于热加载
            // 可以替换代码中的变量
            // https://webpack.js.org/plugins/define-plugin/#use-case-service-urls
            new webpack.DefinePlugin({
                'SERVICE_URL': isProduction ?
                    JSON.stringify("http://pro.example.com") :
                    JSON.stringify("http://dev.example.com"),
                "process.env": {
                    NODE_ENV: isProduction ?
                        JSON.stringify("production") :
                        JSON.stringify("development")
                }
            })
        ],
        /**
         * webpack 自带的开发 server，配合 webpack-dev-server 命令使用
         * https://webpack.js.org/guides/development/#webpack-dev-server
         * https://webpack.js.org/configuration/dev-server/
         */
        devServer:{
            hot: true,
            contentBase: path.join(__dirname, "public"),
            compress: true,
            port: 9000,
            historyApiFallback: true,
            publicPath: '/',
            proxy: {
                "/api": {
                    target: "http://localhost:7000/",
                    pathRewrite: {"^/api" : ""},
                    secure: false,
                    changeOrigin: true,
                }
            }
        },
        devtool: isProduction ?
            'hidden-source-map' :
            'cheap-module-eval-source-map',
    };
}
