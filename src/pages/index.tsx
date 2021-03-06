import Head from 'next/head'
import Main from '../components/layout/Main'; z


const Hallo = ({ label }: { label: string }) => {
    return (
        <div className={'text-red-500'}>
            {label}
        </div>
    )
}

const Home = () => {
    return (
        <Main>
            <Head>
                <title>{"Kanji Today"}</title>
            </Head>
            <div>
                <Hallo label="Hallo Ini Data Yang Di Pass" />
            </div>
        </Main>
    )
}

export default Home