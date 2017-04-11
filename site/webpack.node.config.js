import path from "path";
import nodeExternals from 'webpack-node-externals';

export default  {
    name: 'server',
    target: 'node',
    entry: ['./src/entry_server.js'],
    output: {
        path: './build/',
        publicPath: '/build/',
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