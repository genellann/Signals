/* global __dirname, require, module*/

const webpack = require("webpack");
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const path = require("path");
const env = require("yargs").argv.env; // use --env with webpack 2

let libraryName = JSON.stringify(require("./package.json").name).replace(/\"/g, "");
let version = JSON.stringify(require("./package.json").version).replace(/\"/g, "");

let plugins = [], outputFile;

if (env === "build") {
  plugins.push(new UglifyJsPlugin({minimize: true}));
  outputFile = "phaser-[name]" + "-" + version + ".min.js";
} else {
  outputFile = "phaser-[name]" + "-" + version + ".js";
}

const config = {
  entry: {
    "signals-simple": __dirname + "/src/Signals.js",
    "signals-full": __dirname + "/src/index.js"
  },
  devtool: "source-map",
  output: {
    path: __dirname + "/dist",
    filename: outputFile,
    library: libraryName,
    libraryTarget: "umd",
    umdNamedDefine: true
  },
  externals: {
    Phaser: 'Phaser'
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: "babel-loader",
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  resolve: {
    modules: [path.resolve("./node_modules"), path.resolve("./src")],
    extensions: [".json", ".js"]
  },
  plugins: plugins
};

module.exports = config;
