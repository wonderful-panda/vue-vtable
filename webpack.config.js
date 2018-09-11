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
    devtool: "source-map",
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        modules: [path.join(__dirname, "src"), "node_modules"]
    },
    module: {
        loaders: [{ test: /\.tsx?$/, loader: "babel-loader!ts-loader", exclude: /node_modules/ }]
    },
    externals: ["vue", "vue-tsx-support", "lodash"]
};
