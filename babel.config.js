module.exports = {
  //presets: ["@vue/app"]
  presets: [
    [
      "@babel/preset-env",
      {
        modules: false
      }
    ]
  ],
  plugins: [
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-transform-runtime"
  ]
};
