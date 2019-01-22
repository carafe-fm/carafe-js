// helpers
const path = require('path');
const webpack = require('webpack');

module.exports = (env, options) => {
    return {
        entry: {
            'CarafeFmToCodeSandbox': 'fmhelpers/CarafeFmToCodeSandbox.js',
        },
        resolve: {
            modules: [
                path.join(__dirname, 'es6'),
                'node_modules'
            ]
        },
        output: {
            path: path.resolve(__dirname, 'public/fmhelpers/'),
            filename: 'CarafeFmToCodeSandbox.js',
            publicPath: '/fmhelpers/',
            libraryTarget: "var",
            library: 'CarafeFmToCodeSandbox'
        },
        plugins: [
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
            ]
        }
    }
};