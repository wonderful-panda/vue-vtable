module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.tsx?$/,
    use: [
      "babel-loader",
      {
        loader: "ts-loader",
        options: { transpileOnly: true }
      },
      {
        loader: require.resolve("@storybook/source-loader"),
        options: { parser: "typescript" }
      }
    ],
    exclude: /node_modules/
  });
  config.resolve.extensions.push(".ts", ".tsx");
  return config;
};
