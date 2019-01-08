const webpack = require("webpack");
const { VueLoaderPlugin } = require("vue-loader");
const GasPlugin = require("gas-webpack-plugin");
const WebpackShellPlugin = require("webpack-shell-plugin");

var path = require("path");

const VuetifyLoaderPlugin = require("vuetify-loader/lib/plugin");
module.exports = {
  plugins: [new VuetifyLoaderPlugin()]
};

module.exports = {
  mode: "production",
  context: __dirname,
  entry: {
    "Code.gs": "./src/google-scripts/index.ts",
    "index.js.html": "./src/main.js"
  },
  output: {
    path: __dirname + "/clasp/dist",
    filename: "[name]",
    libraryTarget: "this",
    publicPath: "/clasp/dist"
  },
  module: {
    rules: [
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: "url-loader?limit=100000"
      },
      {
        test: /\.styl$/,
        loader: ["style-loader", "css-loader", "stylus-loader"]
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: "vue-loader",
        options: {
          loaders: {
            js: "babel-loader"
          },
          esModule: true
        }
      },
      {
        test: /\.ts$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      },
      {
        test: /\.css$/,
        use: ["css-loader"]
      },
      {
        test: /\.scss$/,
        use: ["vue-style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        query: {
          presets: ["es2015"]
        }
      }
    ]
  },
  resolve: {
    extensions: [".vue", ".ts", ".js"]
  },
  plugins: [
    new webpack.EnvironmentPlugin(["VUE_APP_SERVICE"]),
    new VueLoaderPlugin(),
    new GasPlugin(),
    new WebpackShellPlugin({
      onBuildEnd: ["./scripts/wrap-in-script.sh clasp/dist/index.js.html"]
    })
  ]
};
