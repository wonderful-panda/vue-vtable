const path = require("path");
const webpackMerge = require("webpack-merge");

module.exports = storybookBaseConfig => {
    return webpackMerge(storybookBaseConfig, {
        context: __dirname,
        resolve: {
            extensions: [".ts", ".tsx", ".js"],
            modules: [path.join(__dirname, "stories"), "node_modules"]
        },
        module: {
            rules: [
                { test: /\.tsx?$/, loader: "babel-loader!ts-loader", exclude: /node_modules/ },
                { test: /\.html$/, loader: "html-loader", exclude: /node_modules/ }
            ]
        }
    });
};
