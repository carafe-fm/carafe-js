// helpers
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, options) => {
    return {
        entry: {
            'CarafeTooling': 'app/CarafeTooling.js',
            'CarafeMarketplace': 'app/CarafeMarketplace.js',
        },
        resolve: {
            modules: [
                path.join(__dirname, 'es6'),
                'node_modules'
            ]
        },
        output: {
            path: path.resolve(__dirname, 'public/apps/'),
            filename: '[name].bundle.js',
            publicPath: '/apps/',
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: '[name]/[name].css',
                chunkFilename: '[id].css'
            }),
            // Ignore node_modules so CPU usage with poll
            // watching drops significantly.
            new webpack.WatchIgnorePlugin([
                path.join(__dirname, "node_modules")
            ]),
        ],
        module: {
            rules: [
                // process js imports
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015'],
                    },
                },
                // process png, jpg, gif, svg imports
                {
                    test: /\.(jpe?g|png|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                    loader: 'url-loader',
                },
                {
                    test: /\.html$/,
                    loader: ['html-loader']
                },
                // process css imports
                {
                    test: /\.(scss|css)$/,
                    use: [
                        'style-loader',
                        'css-loader',
                        'sass-loader',
                    ]
                },
            ]
        }
    }
};