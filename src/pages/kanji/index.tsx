import { NextPage } from 'next';
import User from "../../components/layout/User";
import Head from "next/head";
import { useEffect, useState } from 'react';
import { UsePage } from '../../hooks/useMutation';
import { withQuery } from '../../hoc/withQuery';
import ModalCreateKanji from "../../components/modal/ModalCreateKanji";
import { GoPlus } from 'react-icons/go'
import Skeleton from 'react-loading-skeleton';
import { isEmptyObject } from "../../utils/Validate";


interface Props {

}

interface paginate {
    page: number;
}

const Kanji: NextPage<Props> = () => {

    const defaultPaginate = {
        page: 1
    }

    const [kanji, setKanji] = useState<{ [key: string]: any; }>({});
    const [show, setShow] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<number>(0);
    const [toogle, setToggle] = useState<boolean>(true);
    const [paginate, setPaginate] = useState<any>(defaultPaginate)

    const getPaginate = () => {
        return {
            page: paginate.page
        }
    }

    const onClickOverlay = (kanjiId: number = 0, refresh: boolean = false) => {
        setSelectedId(kanjiId)
        setShow(!show)
        if (refresh) {
            setToggle(!toogle)
        }
    }

    const { isLoading, mutate } = UsePage("/page/kanji")

    useEffect(() => {
        mutate(paginate, {
            onSuccess: (res) => {
                if (res.success) {
                    setKanji(res.data)
                }
            }
        })
    }, [toogle, paginate])

    const Paginate = (data) => {
        if (data.currentPage) {
            return (
                <div className={"flex flex-row"}>
                    {data.currentPage !== 1 && (data.currentPage - 1) !== 1 && (
                        <div className={"p-2 border border-gray-400 rounded mr-2"} onClick={() => setPaginate({ ...paginate, page: 1 })}>
                            First
                        </div>
                    )}
                    {data.currentPage !== 1 && (
                        <div className={"p-2 border border-gray-400 rounded mr-2"} onClick={() => setPaginate({ ...paginate, page: data.currentPage - 1 })}>
                            Prev
                        </div>
                    )}
                    <div className={"p-2 border border-gray-400 rounded mr-2"}>
                        Curr {data.currentPage}
                    </div>
                    <div className={"p-2 border border-gray-400 rounded mr-2"}>
                        Curr {data.currentPage}
                    </div>
                    {data.currentPage + 1 !== data.lastPage && data.currentPage !== data.lastPage && (
                        <div className={"p-2 border border-gray-400 rounded mr-2"} onClick={() => setPaginate({ ...paginate, page: data.currentPage + 1 })}>
                            Next
                        </div>
                    )}
                    {data.currentPage !== data.lastPage && (
                        <div className={"p-2 border border-gray-400 rounded mr-2"} onClick={() => setPaginate({ ...paginate, page: data.lastPage })}>
                            Last
                        </div>
                    )}
                </div>
            )
        } else {
            return null
        }
    }


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
                <button className={"bg-green-400 p-2 rounded text-gray-100 font-bold flex items-center"} onClick={() => onClickOverlay()}>
                    <span><GoPlus className={"mr-2 font-bold"} size={"1.2em"} /></span>
                    <span>Add Kanji</span>
                </button>
            </div>
            <div className={"flex flex-col px-4 py-2 w-full"}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mb-4">
                    {isLoading ? [0, 1, 2, 3, 4, 5].map((data, key) => (
                        <Skeleton className="h-14" key={key} />
                    )) : kanji.data && kanji.data.length > 0 ? kanji.data.map((data, key) => {
                        return (
                            <div className={"bg-gray-300 p-2 rounded flex flex-row"} key={key} onClick={() => onClickOverlay(data.kanjiId)}>
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
                    ) : (<div>No Data</div>)}
                </div>
                {!isEmptyObject(kanji) && (
                    <Paginate data={kanji} />
                )}
                <ModalCreateKanji
                    show={show}
                    onClickOverlay={onClickOverlay}
                    selectedId={selectedId}
                />
            </div>
        </User>
    )
}

export default withQuery(Kanji)

