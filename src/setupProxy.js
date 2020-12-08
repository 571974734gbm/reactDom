const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(createProxyMiddleware('/api', {
    target: 'http://172.28.26.122:8003/backend-pc/demo/',
    changeOrigin: true,
    pathRewrite: {
      '^/api': ''
    }
  }));
};