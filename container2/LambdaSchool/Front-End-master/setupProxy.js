const proxy = require("http-proxy-middleware");

module.exports = app =>{
    app.use(
        "/api",
        proxy({
          target: "http://localhost:5000",
          changeOrigin: true,
          pathRewrite: {
            "^/api": "/api/auth/register"
          }
        })
      );

}


