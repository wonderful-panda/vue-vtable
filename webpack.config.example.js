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
        modules: [ path.join(__dirname, "example/src"), "node_modules" ]
    },
    module: {
        loaders: [
          { test: /\.tsx?$/, loader: "babel-loader!ts-loader", exclude: /node_modules/ },
          { test: /\.pug$/, loader: "vue-template-compiler-loader!../simple-pug-loader", exclude: /node_modules/ }
        ]
    },
    devServer: {
        contentBase: "example",
        publicPath: "/dist/"
    }
};
