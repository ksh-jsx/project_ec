const { createProxyMiddleware } = require("http-proxy-middleware");

const proxy = {
  target: "https://www.google.co.kr",
  changeOrigin: true,
};
module.exports = function (app) {
  app.use("/google", createProxyMiddleware(proxy));
};
