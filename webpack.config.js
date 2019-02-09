// basic vars
const path = require('path');
const webpack = require("webpack");

// additional plugins
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

var isProduction = (process.env.NODE_ENV === 'production');



function recursiveIssuer(m) {
    if (m.issuer) {
        return recursiveIssuer(m.issuer);
    } else if (m.name) {
        return m.name;
    } else {
        return false;
    }
}

// module settings
module.exports = {
    // базовий шлях проекта
    context: path.resolve(__dirname, 'src'),

    //точки входа js
    entry: {
        // основний файл приложения
        app: [
            './js/app.js',
            './scss/style.scss'
        ],
    },

    // путь для зібраних файлів
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '../'
    },
    //devserver config
    devServer: {
        contentBase: './app'
    },

    devtool: (isProduction) ? '' : 'inline-source-map',

    optimization: {
        splitChunks: {
            cacheGroups: {
                fooStyles: {
                    name: 'foo',
                    test: (m, c, entry = 'foo') => m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
                    chunks: 'all',
                    enforce: true
                },
                barStyles: {
                    name: 'bar',
                    test: (m, c, entry = 'bar') => m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
                    chunks: 'all',
                    enforce: true
                },
            },
        },
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                    "postcss-loader"
                ],
            },
            // Image downloading
            {
                test:/\.(png|gif|jpe?g)$/,
                loaders: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                        },
                    },
                    'img-loader',
                ],
            },


            //fonts
            {
                test:/\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                        },
                    },
                ],
            },

            //fonts
            {
                test:/\.svg$/,
                loader: 'svg-url-loader',
            },
        ],
    },

    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            jquery: 'jquery',
            Popper: ['popper.js', 'default']
        }),
        new MiniCssExtractPlugin({
            filename: "./css/[name].css",
        }),
        new CleanWebpackPlugin(['dist']),
        new CopyWebpackPlugin(
            [
                {from: './img', to: 'img'}
            ],
            {
                ignore: [
                    {glob:'svg/*'},
                ],
            },
        ),

    ],
};

//Production only block
if (isProduction) {
    module.exports.plugins.push(
        new UglifyJSPlugin({
            sourceMap: true
        }),
    );
    module.exports.plugins.push(
        new ImageminPlugin({
            test: /\.(png|jpe?g|gif|svg)$/i
       }),
    );
    module.exports.plugins.push(
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
    );
}
