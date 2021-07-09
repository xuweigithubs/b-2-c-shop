const path = require('path');
const { resolve } = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
    mode: 'development',
    target: ['web', 'es5'],
    entry: {
        app:['babel-polyfill', './src/main.ts']
    },
    devServer: {
        contentBase: './dist',
        proxy: {
            '/mshop/api/gataway': {
                target: 'http://127.0.0.1:10010',
                changeOrigin: true,
                pathRewrite: {
                    'mshop/api/gataway': '/api/'
                }
            }
        },
        disableHostCheck: true,
        overlay: {
            warnings: false,
            errors: false
        }
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
        environment: {
            arrowFunction: false
        }
    },
    resolve: {
        extensions: ['.js','.vue','.json','.ts'],
        alias: {
            'vue$':'vue/dist/vue.esm.js',
            '@':path.join(__dirname,'src')
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.less$/i,
                use: ['style-loader', 'css-loader',"less-loader"] // compiles Less to CSS
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|woff||ttf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders:{
                        scss:'style-loader!css-loader!less-loader'
                    }
                }
            },
            {
                test:/\.tsx?$/,
                use:[
                    {
                        loader:'ts-loader',
                        options:{
                            transpileOnly: true,
                        }
                    }
                ],
                exclude:/node_modules/
            },
            // {
            //     test: /\.ts$/,
            //     loader: 'babel-loader',
            //     include: [resolve('src'), resolve('node_modules/webpack-dev-server/client')]
            // }
        ],
    },
    resolveLoader: {
        modules: [
            'node_modules',
            path.resolve(__dirname,'loaders')
        ]
    },
    devtool: 'inline-source-map',
    plugins: [
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: '管理输出',
            template: path.resolve(__dirname, './template/template.html')
        })
    ]
};