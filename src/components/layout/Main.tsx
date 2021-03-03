import { Fragment } from 'react'
import Head from "next/head"

const Main = ({ children }: { children: React.ReactNode }) => {
    return (

        <Fragment>
            <Head>
                <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
            </Head>
            <div className="app flex min-h-screen bg-gray-200 w-full">

                {children}
            </div>
        </Fragment>
    )
}

export default Main
