module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "https://api.meraki.com/api/v0",
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        },
        logLevel: "debug"
      }
    }
  }
};
