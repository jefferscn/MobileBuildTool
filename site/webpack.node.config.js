import path from "path";
import nodeExternals from 'webpack-node-externals';

export default  {
    name: 'server',
    target: 'node',
    entry: ['babel-polyfill','./src/entry_server.js'],
    node: {
        __dirname: false
    },
    output: {
        path: './',
        publicPath: '/',
        filename: 'server.js',
        libraryTarget: 'commonjs',
    },
    externals:[nodeExternals()],
    module: {
        preLoaders: [
            { test: /\.json$/,  loader: 'json'},
        ],
        loaders: [
            // Load ES6/JSX
            {
                test: /\.jsx?$/,
                include: [
                    path.resolve(__dirname, "src"),
                    path.resolve(__dirname, "webpack.config.js")
                ],
                exclude: [
                ],
                loader: "babel"
            }
        ]
   },
   plugins: [
  ]
}