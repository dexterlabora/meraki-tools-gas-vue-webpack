module.exports = {
 
  devServer: {
    proxy: {
      "/api": {
        target: "https://api-mp.meraki.com/api/v1",
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
