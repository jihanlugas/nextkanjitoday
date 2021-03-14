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
import { GridView } from "../../components/widget/Pagination"

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

    const gridView = GridView(paginate, setPaginate);

    return (
        <User>
            <Head>
                <title>Vocabulary</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={"flex px-4 py-2 w-full"}>
                <span className="text-xl py-2">Vocabulary</span>
            </div>
            <div className={"flex px-4 py-2 w-full justify-end items-center"}>
                <button className={"bg-green-400 p-2 rounded text-gray-100 font-bold flex items-center"} onClick={() => onClickOverlay()}>
                    <span><GoPlus className={"mr-2 font-bold"} size={"1.2em"} /></span>
                    <span>Create</span>
                </button>
            </div>
            <div className={"flex flex-col px-4 py-2 w-full"}>
                <gridView.grid>
                    {isLoading ? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((data) => (
                        <gridView.loading key={data} />
                    )) : vocabulary.data && vocabulary.data.map((data, key) => {
                        return (
                            <gridView.data key={key} onClick={() => onClickOverlay(data.vocabularyId)}>
                                <div className={"flex flex-col"}>
                                    <div className={"bg-gray-600 rounded p-1"}>
                                        <div className={"text-gray-100 text-xs"}>
                                            {data.kana}
                                        </div>
                                        <div className={"text-gray-100 text-xl"}>
                                            {data.vocabulary}
                                        </div>
                                    </div>
                                    <div className={"font-bold"}>
                                        {data.mean}
                                    </div>
                                    {data.notes !== "" && (
                                        <div className={"text-sm whitespace-pre"}>
                                            <p>
                                                {data.notes}
                                            </p>
                                        </div>
                                    )}
                                    {data.hints.length > 0 && (
                                        <div className={"text-sm flex flex-row mt-4"}>
                                            {data.hints.map((data, key) => (
                                                <div className={"mr-1 rounded"} key={key}>
                                                    #{data.hint}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </gridView.data>
                        )
                    })}
                </gridView.grid>
                <gridView.paginate data={vocabulary} />
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

