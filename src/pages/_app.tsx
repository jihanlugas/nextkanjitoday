import './styles/global.scss'
import { AppProps, AppContext } from 'next/app'
import App from 'next/app';

function isBrowser() {
    return typeof window !== 'undefined';
}


function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />
}

MyApp.getInitialProps = async (ctx: AppContext) => {

    const { res, req, pathname } = ctx.ctx;

    if (!isBrowser() && res) {
        if (req.headers.cookie) {
            if (req.headers.cookie.includes("Authorization")) {
                if (pathname === "/sign-in") {
                    res.writeHead(302, { Location: "/dashboard" });
                    res.end();
                }
            } else {
                if (pathname !== "/sign-in") {
                    res.writeHead(302, { Location: "/sign-in" });
                    res.end();
                }
            }
        } else {
            if (pathname !== "/sign-in") {
                res.writeHead(302, { Location: "/sign-in" });
                res.end();
            }
        }
    }

    const appProps = await App.getInitialProps(ctx)

    return { ...appProps }
}

export default MyApp