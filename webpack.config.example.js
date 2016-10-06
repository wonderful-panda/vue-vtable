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
        root: path.join(__dirname, "example/src"),
        alias: {
            vue: "vue/dist/vue.js"
        }
    },
    module: {
        loaders: [
          { test: /\.js$/, loader: "babel-loader?presets[]=es2015", exclude: /node_modules/ },
          { test: /\.ts$/, loader: "babel-loader?presets[]=es2015!ts-loader", exclude: /node_modules/ },
          { test: /\.pug$/, loader: "vue-template-compiler-loader!simple-pug-loader", exclude: /node_modules/ },
          { test: /\.html$/, loader: "html-loader", exclude: /node_modules/ }
        ]
    },
    resolveLoader: {
        alias: {
            "simple-pug-loader": path.join(__dirname, "simple-pug-loader")
        }
    },
    devServer: {
        contentBase: "example",
        publicPath: "/dist/"
    }
};
