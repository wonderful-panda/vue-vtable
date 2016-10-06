var path = require("path");

module.exports = {
    context: path.join(__dirname, "src"),
    entry: "./index.ts",
    output: {
        library: "vue-vlist",
        libraryTarget: "umd",
        path: path.join(__dirname, "dist"),
        filename: "index.js"
    },
    devtool: 'source-map',
    resolve: {
        extensions: ["", ".ts", ".js"],
        root: path.join(__dirname, "src")
    },
    module: {
        loaders: [
          { test: /\.ts$/, loader: "ts-loader", exclude: /node_modules/ },
          { test: /\.pug$/, loader: "vue-template-compiler-loader!simple-pug-loader", exclude: /node_modules/ }
        ]
    },
    resolveLoader: {
        alias: {
            "simple-pug-loader": path.join(__dirname, "simple-pug-loader")
        }
    },
    externals: [
        "vue",
        "lodash"
    ]
};
