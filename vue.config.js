module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "https://api-mp.meraki.com/api/v0",
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        },
        logLevel: "info"
      }
    }
  }
};
