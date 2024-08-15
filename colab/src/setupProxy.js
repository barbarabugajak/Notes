const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:8000',
            changeOrigin: true,
            secure: false,
            onProxyReq: (proxyReq, req, res) => {
                if (req.headers['x-csrftoken']) {
                    proxyReq.setHeader('X-CSRFToken', req.headers['x-csrftoken']);
                }
            }
        })
    );
};