import { createProxyMiddleware } from "http-proxy-middleware";

export default createProxyMiddleware('/api', {
    target: process.env.IS_PRODUCTION ? "http://kanjitoday.se-kawan.com" : "http://kanjitoday.web",
    changeOrigin: true,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    }
});

export const config = {
    api: {
        bodyParser: false
    }
}