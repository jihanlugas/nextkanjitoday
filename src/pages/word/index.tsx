import { NextPage } from 'next';
import User from "../../components/layout/User";
import Head from "next/head";
import { useEffect, useState } from 'react';
import { UsePage } from '../../hooks/useMutation';
import { withQuery } from '../../hoc/withQuery';
import ModalCreateWord from "../../components/modal/ModalCreateWord";
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

const Word: NextPage<Props> = ({ notif }) => {

    const defaultPaginate = {
        page: 1,
        perPage: 10,
    }

    const [word, setWord] = useState<{ [key: string]: any; }>({});
    const [show, setShow] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<number>(0);
    const [toogle, setToggle] = useState<boolean>(true);
    const [paginate, setPaginate] = useState<paginate>(defaultPaginate)

    const onClickOverlay = (wordId: number = 0, refresh: boolean = false) => {
        setSelectedId(wordId)
        setShow(!show)
        if (refresh) {
            setToggle(!toogle)
        }
    }

    const { isLoading, mutate } = UsePage("/page/word")

    useEffect(() => {
        mutate(paginate, {
            onSuccess: (res) => {
                if (res.success)
                    setWord(res.data)
            }
        })
    }, [toogle, paginate])

    const gridView = GridView(paginate, setPaginate);

    return (
        <User>
            <Head>
                <title>Word</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={"flex px-4 py-2 w-full"}>
                <span className="text-xl py-2">Word</span>
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
                    )) : word.data && word.data.map((data, key) => {
                        return (
                            <gridView.data key={key} onClick={() => onClickOverlay(data.wordId)}>
                                <div className={"flex flex-col"}>
                                    <div className={"bg-gray-600 rounded p-1"}>
                                        <div className={"text-gray-100 text-xs"}>
                                            {data.kana}
                                        </div>
                                        <div className={"text-gray-100 text-xl"}>
                                            {data.word}
                                        </div>
                                    </div>
                                    <div>
                                        {data.mean}
                                    </div>
                                    <div>
                                        {data.hint}
                                    </div>
                                </div>
                            </gridView.data>
                        )
                    })}
                </gridView.grid>
                <gridView.paginate data={word} />
                <ModalCreateWord
                    show={show}
                    onClickOverlay={onClickOverlay}
                    selectedId={selectedId}
                    notif={notif}
                />
            </div>
        </User>
    )
}

export default withNotif(withQuery(Word))

