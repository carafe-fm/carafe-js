// helpers
const glob = require('glob');
const path = require('path');

// plugins
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const hotCoffee = `
 Starting A Fresh Brew
                 )
                (
    __========__ )
 .-'------------ /
( C|/\\/\\/\\/\\/\\/\\|
 '-./\\/\\/\\/\\/\\/\\|
   '____________'
    '----------'

  Smells Delicious!
`;

// Manifest of packages to be build
let packagesToBuild = {
    'Carafe': './src/app/Carafe.js'
};

module.exports = (env, options) => {
    let outputPath = path.resolve(__dirname, 'dist');

    let plugins = [
        new MiniCssExtractPlugin({
            filename: '[name]/[name].css',
            chunkFilename: '[name].css'
        })
    ];

    if (options.mode === 'production') {
        plugins.push(
            new OptimizeCssAssetsPlugin({
                assetNameRegExp: /\.css$/g,
                cssProcessor: require('cssnano'),
                cssProcessorOptions: {
                    safe: true,
                    discardComments: {removeAll: true}
                },
                canPrint: true
            })
        );
    }

    plugins.unshift(new CleanWebpackPlugin([outputPath]));

    console.log(hotCoffee);
    return {
        entry: packagesToBuild,
        devtool: 'source-map',
        resolve: {
            modules: [
                path.join(__dirname, 'src'),
                'node_modules'
            ]
        },
        output: {
            path: outputPath,
            filename: '[name].js',
            library: 'Carafe',
            publicPath: '/',
        },
        plugins: plugins,
        module: {
            rules: [
                // process js imports
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    query: {
                        presets: [
                            [
                                'env',
                                {
                                    "targets": {
                                        "ie": "11"
                                    }
                                }
                            ]
                        ],
                    },
                },
                // process css imports
                {
                    test: /\.(scss|css)$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: "css-loader" // translates CSS into CommonJS
                        },
                        {
                            loader: "sass-loader" // compiles Sass to CSS
                        }
                    ]
                },
                // process png, jpg, gif, svg imports
                {
                    test: /\.(jpe?g|png|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                    loader: 'url-loader',
                },
                // process html imports - excluding our default template
                {
                    test: /Template\.html$/, loader: 'ignore-loader'
                },
                {
                    test: /\.html$/,
                    loader: ['html-loader']
                },
            ]
        }
    }
};