const { CheckerPlugin } = require("awesome-typescript-loader");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const webpack = require("webpack");
const { join } = require("path");
const prodPlugins = [];
if (process.env.NODE_ENV === "production") {
  prodPlugins.push(new webpack.optimize.AggressiveMergingPlugin());
}
module.exports = {
  mode: process.env.NODE_ENV,
  devtool: "inline-source-map",
  entry: {
    background: join(__dirname, "src/background.ts"),
    popup: [join(__dirname, "src/popup.ts"), join(__dirname, "src/popup.scss")],
  },
  output: {
    path: join(__dirname, "dist"),
    filename: "[name].js",
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.ts?$/,
        use: 'awesome-typescript-loader?{configFileName: "tsconfig.json"}',
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new CheckerPlugin(),
    ...prodPlugins,
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
  resolve: {
    extensions: [".ts", ".js"],
  },
};
