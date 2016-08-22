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
          { test: /\.ts$/, loader: "ts-loader" },
          { test: /\.html$/, loader: "html-loader" }
        ]
    }
};
