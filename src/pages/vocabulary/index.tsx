import { NextPage } from 'next';
import User from "../../components/layout/User";
import Head from "next/head";
import { useEffect, useState } from 'react';
import { UsePage } from '../../hooks/useMutation';
import { withQuery } from '../../hoc/withQuery';
import ModalCreateVocabulary from "../../components/modal/ModalCreateVocabulary";
import { GoPlus } from 'react-icons/go'
import Skeleton from 'react-loading-skeleton';
import { isEmptyObject } from "../../utils/Validate";
import { withNotif } from '../../hoc/withNotif';


interface Props {
    notif: {
        error: Function,
        info: Function,
        success: Function,
        warning: Function,
    }
}


interface paginate {
    page: number;
    perPage: number;
}

const Vocabulary: NextPage<Props> = ({ notif }) => {

    const defaultPaginate = {
        page: 1,
        perPage: 10,
    }

    const [vocabulary, setVocabulary] = useState<{ [key: string]: any; }>({});
    const [show, setShow] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<number>(0);
    const [toogle, setToggle] = useState<boolean>(true);
    const [paginate, setPaginate] = useState<paginate>(defaultPaginate)

    const onClickOverlay = (vocabularyId: number = 0, refresh: boolean = false) => {
        setSelectedId(vocabularyId)
        setShow(!show)
        if (refresh) {
            setToggle(!toogle)
        }
    }

    const { isLoading, mutate } = UsePage("/page/vocabulary")

    useEffect(() => {
        mutate(paginate, {
            onSuccess: (res) => {
                if (res.success)
                    setVocabulary(res.data)
            }
        })
    }, [toogle, paginate])

    const Paginate = ({ data }) => {
        if (data.currentPage !== data.lastPage) {
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
                <title>Vocabulary</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={"flex px-4 py-2 w-full"}>
                <span className="text-xl py-2">Vocabulary</span>
            </div>
            <div className={"flex px-4 py-2 w-full justify-between items-center"}>
                <div className={""}>
                    <select className={"p-2 w-24 rounded"} name="" id="" onChange={(event) => setPaginate({ ...paginate, perPage: parseInt(event.target.value) })}>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                    </select>
                </div>
                <button className={"bg-green-400 p-2 rounded text-gray-100 font-bold flex items-center"} onClick={() => onClickOverlay()}>
                    <span><GoPlus className={"mr-2 font-bold"} size={"1.2em"} /></span>
                    <span>Add Vocabulary</span>
                </button>
            </div>
            <div className={"flex flex-col px-4 py-2 w-full"}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mb-4">
                    {isLoading ? [0, 1, 2, 3, 4, 5].map((data, key) => (
                        <Skeleton className="h-14" key={key} />
                    )) : vocabulary.data && vocabulary.data.length > 0 ? vocabulary.data.map((data, key) => {
                        console.log("data ", data)
                        return (
                            <div className={"bg-gray-300 p-2 rounded flex flex-col"} key={key} onClick={() => onClickOverlay(data.vocabularyId)}>
                                <div className={"bg-gray-600 rounded p-1"}>
                                    <div className={"text-gray-100 text-xs"}>
                                        {data.kana}
                                    </div>
                                    <div className={"text-gray-100 text-xl"}>
                                        {data.vocabulary}
                                    </div>
                                </div>
                                <div>
                                    {data.mean}
                                </div>
                            </div>
                        )
                    }) : (<div>No Data</div>)}
                </div>
                {!isEmptyObject(vocabulary) && (
                    <Paginate data={vocabulary} />
                )}
                <ModalCreateVocabulary
                    show={show}
                    onClickOverlay={onClickOverlay}
                    selectedId={selectedId}
                    notif={notif}
                />
            </div>
        </User>
    )
}

export default withNotif(withQuery(Vocabulary))

