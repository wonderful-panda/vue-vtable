var path = require("path");

module.exports = {
    context: path.join(__dirname, "example/src"),
    entry: "./main.ts",
    output: {
        path: path.join(__dirname, "example/dist"),
        filename: "build.js"
    },
    devtool: 'source-map',
    resolve: {
        extensions: ["", ".ts", ".js"],
        root: path.join(__dirname, "example/src")
    },
    module: {
        loaders: [
          { test: /\.ts$/, loader: "babel?presets[]=es2015!ts", exclude: /node_modules/ },
          { test: /\.pug$/, loader: "vue-template-compiler!simple-pug", exclude: /node_modules/ }
        ]
    },
    resolveLoader: {
        alias: {
            "simple-pug": path.join(__dirname, "simple-pug-loader")
        }
    },
    devServer: {
        contentBase: "example",
        publicPath: "/dist/"
    }
};
