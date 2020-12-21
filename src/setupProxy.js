const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(createProxyMiddleware('/api', {
    target: 'http://172.28.26.160:8003/demo/',
    changeOrigin: true,
    pathRewrite: {
      '^/api': ''
    }
  }));
};