import { NextPage } from 'next';
import User from "../../components/layout/User";
import Head from "next/head";
import { useEffect, useState } from 'react';
import { UsePage } from '../../hooks/useMutation';
import { withQuery } from '../../hoc/withQuery';
import ModalCreateKanjiExample from "../../components/modal/ModalCreateKanjiExample";
import { GoPlus } from 'react-icons/go'
import Skeleton from 'react-loading-skeleton';


interface Props {

}

const KanjiExample: NextPage<Props> = () => {

    const dummy = [
        {
            kanjiId: 1,
            word: "日",
            kanjiyomis: [
                {
                    kanjiyomiId: 1,
                    word: "ひ",
                    kanjiyomiexamples: [
                        {
                            kanjiyomiexampleId: 1,
                            word: ""
                        }
                    ]
                }
            ]
        }
    ]

    const [kanjiexample, setKanjiExample] = useState<any[]>([]);
    const [show, setShow] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<number>(0);
    const [toogle, setToggle] = useState<boolean>(true);

    const onClickOverlay = (kanjiexampleId: number = 0, refresh: boolean = false) => {
        setSelectedId(kanjiexampleId)
        setShow(!show)
        if (refresh) {
            setToggle(!toogle)
        }
    }

    const { isLoading, mutate } = UsePage("/page/kanjiexample")

    useEffect(() => {
        mutate(null, {
            onSuccess: (res) => {
                if (res.success)
                    setKanjiExample(res.data.data)
            }
        })
    }, [toogle])

    return (
        <User>
            <Head>
                <title>Kanji Example</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={"flex px-4 py-2 w-full"}>
                <span className="text-xl py-2">Kanji Example</span>
            </div>
            <div className={"flex px-4 py-2 w-full justify-end"}>
                <button className={"bg-green-400 p-2 rounded text-gray-100 font-bold flex items-center"} onClick={() => onClickOverlay()}>
                    <span><GoPlus className={"mr-2 font-bold"} size={"1.2em"} /></span>
                    <span>Add Kanji Example</span>
                </button>
            </div>
            <div className={"flex flex-col px-4 py-2 w-full"}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {isLoading ? [0, 1, 2, 3, 4, 5].map((data, key) => (
                        <Skeleton className="h-14" key={key} />
                    )) : kanjiexample.map((data, key) => {
                        return (
                            <div className={"bg-gray-300 p-2 rounded flex flex-row"} key={key} onClick={() => onClickOverlay(data.kanjiexampleId)}>
                                <div className={"h-12 w-12 bg-gray-400 flex justify-center items-center rounded-full"}>
                                    <div className={"text-2xl font-light"}>
                                        {data.word}
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex flex-row mb-1">
                                        {data.kanjiyomis.map((kanjiyomi) => {
                                            if (kanjiyomi.type === 'ONYOMI') {
                                                return (
                                                    <div className="bg-green-600 rounded px-1 mx-1 text-gray-100 text-sm font-bold" key={kanjiyomi.kanjiyomiId}>
                                                        {kanjiyomi.word}
                                                    </div>
                                                )
                                            } else {
                                                return (
                                                    <div className="bg-blue-600 rounded px-1 mx-1 text-gray-100 text-sm font-bold" key={kanjiyomi.kanjiyomiId}>
                                                        {kanjiyomi.word}
                                                    </div>
                                                )
                                            }
                                        })}
                                    </div>
                                    <div>
                                        <div className="px-1 mx-1 text-sm flex flex-col">
                                            {data.kanjimeans.map((kanjimean) => {
                                                return (
                                                    <span key={kanjimean.kanjimeanId}>{kanjimean.mean}</span>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    )}
                </div>
                {/* <ModalCreateKanjiExample
                    show={show}
                    onClickOverlay={onClickOverlay}
                    selectedId={selectedId}
                /> */}
            </div>
        </User>
    )
}

export default withQuery(KanjiExample)
