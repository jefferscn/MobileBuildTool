import path from "path";
import webpack from "webpack";

export default (DEBUG, PATH, PORT = 3000) => ({
    entry: (DEBUG ? [
            `webpack-dev-server/client?http://localhost:${PORT}`,
        ] : []).concat([
        'babel-polyfill',
        './src/entry',
    ]),

    output: {
        path: path.resolve(__dirname, PATH, "generated"),
        filename: "main.js",
        publicPath: "./generated/"
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
                    path.resolve(__dirname, "src"),
                ],
                exclude: [
                ],
                loader: "babel"
            }
        ]
    },
    plugins: DEBUG
        ? []
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
