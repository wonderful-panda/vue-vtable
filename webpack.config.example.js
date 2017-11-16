var path = require("path");

module.exports = {
    context: path.join(__dirname, "example/src"),
    entry: ["babel-polyfill", "./main.ts"],
    output: {
        path: path.join(__dirname, "example/dist"),
        filename: "build.js"
    },
    devtool: 'source-map',
    resolve: {
        extensions: [".ts", ".tsx",".js"],
        modules: [ path.join(__dirname, "example/src"), "node_modules" ],
        alias: {
            "vue$": "vue/dist/vue.js"
        }
    },
    module: {
        loaders: [
          { test: /\.tsx?$/, loader: "babel-loader!ts-loader", exclude: /node_modules/ },
          { test: /\.html$/, loader: "html-loader", exclude: /node_modules/ }
        ]
    },
    devServer: {
        contentBase: "example",
        publicPath: "/dist/"
    }
};
