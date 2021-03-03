import { NextPage } from 'next';
import User from "../../components/layout/User";
import Head from "next/head";
import { useEffect, useState } from 'react';
import { UsePage } from '../../hooks/useMutation';
import { withQuery } from '../../hoc/withQuery';
import ModalCreateKanji from "../../components/modal/ModalCreateKanji";


interface Props {

}

const Kanji: NextPage<Props> = () => {

    const [kanji, setKanji] = useState([]);
    const [show, setShow] = useState(false);

    const onClickOverlay = () => {
        setShow(!show)
    }

    const { isLoading, mutate } = UsePage()

    useEffect(() => {
        mutate(null, {
            onSuccess: (data) => {
                setKanji(data.payload.items)
            }
        })
    }, [])

    return (
        <User>
            <Head>
                <title>Kanji</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={"flex px-4 py-2 w-full"}>
                <span className="text-xl py-2">Kanji</span>
            </div>
            <div className={"flex px-4 py-2 w-full justify-end"}>
                <button className={"bg-green-400 px-4 py-2 rounded text-gray-100 font-bold"} onClick={onClickOverlay}>
                    Add
                </button>
            </div>
            <div className={"flex flex-col px-4 py-2 w-full"}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {isLoading ? (
                        <div>
                            <div>Loading</div>
                        </div>
                    ) : kanji.map((data, key) => {
                        return (
                            <div className={"bg-gray-300 p-2 rounded flex flex-row"} key={key}>
                                <div className={"h-12 w-12 bg-gray-400 flex justify-center items-center rounded-full"}>
                                    <div className={"text-2xl font-light"}>
                                        {data.word}
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex flex-row">
                                        {data.kanjionyomis.map((kanjionyomi) => {
                                            return (
                                                <div className="bg-green-600 rounded px-1 mx-1 text-gray-100 text-sm font-bold" key={kanjionyomi.kanjionyomiId}>
                                                    {kanjionyomi.word}
                                                </div>
                                            )
                                        })}
                                        {data.kanjikunyomis.map((kanjikunyomi) => {
                                            return (
                                                <div className="bg-blue-600 rounded px-1 mx-1 text-gray-100 text-sm font-bold" key={kanjikunyomi.kanjikunyomiId}>
                                                    {kanjikunyomi.word}
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div>
                                        {data.kanjimeans.map((kanjimean) => {
                                            return (
                                                <div className="bg-blue-600 rounded px-1 mx-1 text-gray-100 text-sm font-bold" key={kanjimean.kanjimeanId}>
                                                    {kanjimean.mean}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    )}
                </div>
                <ModalCreateKanji
                    show={show}
                    onClickOverlay={onClickOverlay}
                />
            </div>
        </User>
    )
}

export default withQuery(Kanji)

