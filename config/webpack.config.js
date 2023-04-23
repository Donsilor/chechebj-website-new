const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const entryList = [
  "main",
  "ewApply",
  "dhApply",
  "dataApply",
  "carApply",
  "carSeApply",
  "operApply",
  "product-yichaku",
  "product-cheyinrongtong",
  "product-cheyouhui",
  "product-innercontrol",
  "product-loanmanagement",
  "product-smartvideo",
  "core-technology",
  "apply-trial",
  "submit-trial",
  "aboutus",
  "mianzesm",
];

module.exports = {
  mode: "development",
  entry: entryList.reduce((result, key) => {
    result[key] = path.resolve(__dirname, `../src/pages/${key}/index.js`);
    return result;
  }, {}),
  devtool: "inline-source-map",
  devServer: {
    host: "0.0.0.0",
    hot: true,
    contentBase: path.resolve(__dirname, "../dist"),
    port: 6060,
  },
  output: {
    filename: "[name]/js/index.js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/",
  },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new MiniCssExtractPlugin({
      filename: "[name]/styles/index.[contenthash].css",
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
    ...entryList.map(
      (key) =>
        new HtmlWebpackPlugin({
          filename: `${key === "main" ? "index" : key}.html`,
          template: path.resolve(__dirname, `../src/pages/${key}/index.html`),
          chunks: [key],
          favicon: path.resolve(__dirname, `../favicon.ico`),
        })
    ),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10240,
              name: "assets/[name].[ext]",
              // publicPath: "http://cheche-website.oss-cn-beijing.aliyuncs.com/"
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"],
      },
    ],
  },
  resolve: {
    modules: ["node_modules"],
    alias: {
      "@": path.resolve(__dirname, "../src/"),
    },
  },
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vender: {
          test: /[\\/]node_modules[\\/]/,
          // cacheGroupKey here is `commons` as the key of the cacheGroup
          name: "vendor",
          chunks: "all",
        },
      },
    },
  },
};
