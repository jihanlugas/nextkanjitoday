import { createProxyMiddleware } from "http-proxy-middleware";

export default createProxyMiddleware('/api', {
    target: "http://kanjitoday.web", // local
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