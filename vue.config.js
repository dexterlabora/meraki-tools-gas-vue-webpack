module.exports = {
 
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': '*',
  },
    proxy: {
      "/api": {
        target: "https://api.meraki.com/api/v1",
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
