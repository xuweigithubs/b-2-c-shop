const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
    mode: 'development',
    entry: "./src/main.ts",
    devtool: 'source-map',
    devServer: {
        contentBase: './dist',
        proxy: {
            '/mshop/api/gataway': {
                target: 'http://localhost:8089',
                changeOrigin: true,
                pathRewrite: {
                    'mshop/api/gataway': ''
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
            }
        ],
    },
    resolveLoader: {
        modules: [
            'node_modules',
            path.resolve(__dirname,'loaders')
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
        new HtmlWebpackPlugin({
            title: '管理输出',
            template: path.resolve(__dirname, './template/template.html')
        })
    ]
};