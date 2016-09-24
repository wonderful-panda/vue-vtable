var path = require("path");

module.exports = {
    context: path.join(__dirname, "example/src"),
    entry: "./main.js",
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
          { test: /\.js$/, loader: "babel-loader?presets[]=es2015", exclude: /node_modules/ },
          { test: /\.ts$/, loader: "ts-loader", exclude: /node_modules/ },
          { test: /\.pug$/, loader: "pug-html-loader", exclude: /node_modules/ },
          { test: /\.html$/, loader: "html-loader", exclude: /node_modules/ }
        ]
    },
    devServer: {
        contentBase: "example",
        publicPath: "/dist/"
    }
};
