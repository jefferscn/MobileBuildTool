import path from "path";
import webpack from "webpack";

export default (DEBUG, PATH, PORT = 3000) => ({
    entry: (DEBUG ? [
            `webpack-hot-middleware/client?reload=true`,
        ] : []).concat([
        'babel-polyfill',
        './src/entry_ui',
    ]),

    output: {
        path: '/',
        filename: "main.js",
        publicPath: "/"
    },

    cache: DEBUG,
    debug: DEBUG,

    devtool: DEBUG ? 'source-map' : false,
    // devtool:'eval-source-map',

    module: {
        loaders: [
            // Load ES6/JSX
            {
                test: /\.jsx?$/,
                include: [
                    path.resolve("src"),
                    path.resolve("node_modules/punycode/")
                ],
                exclude: [
                ],
                loader: "babel"
            }
        ]
    },
    plugins: DEBUG
        ? [
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoErrorsPlugin()]
        : [
            new webpack.DefinePlugin({'process.env.NODE_ENV': '"production"'}),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin({
                compressor: {screw_ie8: true, keep_fnames: true, warnings: false},
                mangle: {screw_ie8: true, keep_fnames: true}
            }),
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.optimize.AggressiveMergingPlugin(),
        ],

    resolveLoader: {
        root: path.join(__dirname, "node_modules"),
    },

    resolve: {
        root: path.join(__dirname, "node_modules"),

        modulesDirectories: ['node_modules'],

        // Allow to omit extensions when requiring these files
        extensions: ["", ".js", ".jsx"],
    }
});
