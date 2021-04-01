/* global __dirname, require, module*/

const path = require("path");
const yargs = require("yargs");
const NpmDtsPlugin = require('npm-dts-webpack-plugin')
const env = yargs.argv.env; // use --env with webpack 2
const pkg = require("./package.json");
const shouldExportToAMD = yargs.argv.amd;

let libraryName = pkg.name;

let outputFile, mode, plugins = [];

if (shouldExportToAMD) {
  libraryName += ".amd";
}

if (env === "build") {
  mode = "production";
  outputFile = libraryName + ".min.js";
} else {
  mode = "development";
  outputFile = libraryName + ".js";
}

const config = {
  mode: mode,
  // entry: __dirname + "/src/index.js",
  entry: __dirname + "/src/index.ts",
  devtool: "source-map",
  output: {
    path: __dirname + "/lib",
    filename: outputFile,
    library: libraryName,
    libraryTarget: shouldExportToAMD ? "amd" : "umd",
    libraryExport: "default",
    umdNamedDefine: true,
    globalObject: "typeof self !== 'undefined' ? self : this",
  },
  module: {
    rules: [
      {
        test: /\.worker\.ts$/,
        use: {
          loader: 'worker-loader',
          options: { inline: "fallback" },
        },
      },
      {
        test: /(\.ts|\.tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /(\.jsx|\.js)$/,
        use: {
          loader: "babel-loader"
        },
        exclude: /(node_modules|bower_components)/,
      },
    ],
  },
  resolve: {
    modules: [path.resolve("./node_modules"), path.resolve("./src")],
    extensions: [".json", ".js", '.tsx', '.ts',],
  },
  plugins: [
    new NpmDtsPlugin({
      entry: './src',
      output: `./lib/${libraryName}.d.ts`
    })
  ],
};

module.exports = config;

