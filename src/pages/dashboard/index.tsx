import { NextPage } from 'next';
import User from "../../components/layout/User";
import Head from "next/head";


interface Props {

}

const Dashboard: NextPage<Props> = () => {
    return (
        <User>
            <Head>
                <title>Dashboard</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={"flex flex-col p-4 w-full"}>
                <div className="mb-2">
                    <span className="text-xl py-2">Dashboard</span>
                </div>
            </div>
            <div className={"flex flex-col w-full"}>
            </div>
        </User>
    )
}

export default Dashboard

