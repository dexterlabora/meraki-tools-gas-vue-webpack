const webpack = require("webpack");
const { VueLoaderPlugin } = require("vue-loader");
const GasPlugin = require("gas-webpack-plugin");
const WebpackShellPlugin = require("webpack-shell-plugin");
const Dotenv = require('dotenv-webpack');
require("babel-polyfill");

var path = require("path");

const VuetifyLoaderPlugin = require("vuetify-loader/lib/plugin");
// module.exports = {
//   plugins: [new VuetifyLoaderPlugin()]
// };

module.exports = {
  mode: "production",
  context: __dirname,
  entry: {
    "Code.gs": "./src/google-scripts/index.ts",
    "index.js.html": "./src/main.js",
    app: ["babel-polyfill", "./src/main.js"]
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
        loader: ["url-loader?limit=100000", "file-loader"]
      },
      // {
      //   test: /\.styl$/,
      //   loader: ["style-loader", "css-loader", "stylus-loader"]
      // },
      //{ test: /\.json$/, loader: "json-loader" },
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
        test: /\.scss$/,
        use: ["vue-style-loader", "css-loader", "sass-loader"]
      },
      // {
      //   test: /\.styl$/,
      //   loader: ["style-loader", "css-loader", "stylus-loader"]
      // },
      // {
      //   test: /\.css$/,
      //   use: ["css-loader"]
      // },
      {
        test: /\.css$/i,
        loader: "css-loader",
        options: {
          import: true,
        },
      },
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader"
      },
      {
        test: /\.s(c|a)ss$/,
        exclude: [path.resolve(__dirname, './src/components/shared/v-swagger')],
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            // Requires sass-loader@^7.0.0
            options: {
              implementation: require('sass'),
              indentedSyntax: true // optional
            },
            // Requires >= sass-loader@^8.0.0
            options: {
              implementation: require('sass'),
              sassOptions: {
                indentedSyntax: true // optional
              },
            },
          },
        ],
      }
    ]
  },
  resolve: {
    extensions: [".vue", ".ts", ".js"]
  },
  node: {
    console: true,
    fs: "empty",
    net: "empty",
    tls: "empty"
  },
  plugins: [
    new Dotenv(),
    new webpack.EnvironmentPlugin(["VUE_APP_SERVICE","VUE_APP_API_KEY"]),
    new VueLoaderPlugin(),
    new GasPlugin(),
    new WebpackShellPlugin({
      onBuildEnd: ["./scripts/wrap-in-script.sh clasp/dist/index.js.html"]
    })
  ]
};