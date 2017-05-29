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
        extensions: [".ts", ".js"],
        modules: [ path.join(__dirname, "example/src"), "node_modules" ]
    },
    module: {
        loaders: [
          { test: /\.ts$/, loader: "babel-loader?presets[]=es2015!ts-loader", exclude: /node_modules/ },
          { test: /\.pug$/, loader: "vue-template-compiler-loader!simple-pug-loader", exclude: /node_modules/ }
        ]
    },
    resolveLoader: {
        alias: {
            "simple-pug-loader": "../../simple-pug-loader"
        }
    },
    devServer: {
        contentBase: "example",
        publicPath: "/dist/"
    }
};
