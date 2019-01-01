const { VueLoaderPlugin } = require("vue-loader");
const GasPlugin = require("gas-webpack-plugin");

module.exports = {
  mode: "production",
  context: __dirname,
  entry: {
    "Code.gs": "./src/index.ts",
    "index.js.html": "./src/client/index.ts"
  },
  output: {
    path: __dirname + "/clasp/dist",
    filename: "[name]",
    libraryTarget: "this"
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: "vue-loader",
        options: {
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
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".vue", ".ts", ".js"]
  },
  plugins: [new VueLoaderPlugin(), new GasPlugin()]
};
