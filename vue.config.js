module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],

    devServer: {
    //   headers: {
    //     'Access-Control-Allow-Origin': '*',
    //     'Access-Control-Allow-Headers': '*',
    //     'Access-Control-Allow-Methods': '*',
    // },
      // proxy: {
      //   "/api": {
      //     headers: {
      //       "Access-Control-Allow-Origin": "*",
      //    },
      //     target: "https://api.meraki.com/api/v1",
      //      secure: false,
      //     changeOrigin: true,
      //     pathRewrite: {
      //       "^/api": ""
      //     },
      //     logLevel: "debug"
      //   }
      // }
      proxy: {
        "^/api/": {
          target: "https://merakidemo.internetoflego.com/meraki/proxy", // Temp proxy, because I was getting CORS issues with the above method
          pathRewrite: { "^/api/": "" },
          changeOrigin: true,
          logLevel: "debug"
        }
    }
    

  }
};