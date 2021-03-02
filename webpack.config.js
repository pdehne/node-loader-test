const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, argv) => {
    const isDevelopment = env.NODE_ENV !== "production";

    return {
        mode: isDevelopment ? 'development' : 'production',
        devtool: isDevelopment ? 'source-map' : undefined,

        resolve: {
            extensions: ['.js']
        },

        target: "electron-renderer",

        entry: {
            index: "./src/index.js"
        },

        output: {
            path: path.resolve(__dirname, 'app'),

            filename: (chunkData) => {
                if (chunkData.chunk.name === "index")
                    return isDevelopment ? "renderer.js" : "renderer.min.js";

                return "[name].js";
            },
        },

        devServer: {
            port: 8084,
            contentBase: path.resolve(__dirname, "app"),
            historyApiFallback: true,
            proxy: {
                "/api": "http://localhost:8101",
                "/adm/api": "http://localhost:8101"
            }
        },

        plugins: [
            new HtmlWebpackPlugin({
                title: 'node-loader-test',
                template: 'src/index.ejs'
            }),

            // new CleanWebpackPlugin({
            //     cleanOnceBeforeBuildPatterns: ['**/*', '!main.js', '!assets/**']
            // }),
        ],

        module: {
            rules: [
                {
                    test: /\.m?(ts|js)x?$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader'
                    }
                },
                {
                    test: /\.node$/,
                    loader: 'node-loader',
                    options: {
                        name: '[path][name].[ext]'
                    }
                }
            ]
        }
    }
}
