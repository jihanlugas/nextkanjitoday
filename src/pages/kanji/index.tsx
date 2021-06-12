import { NextPage } from 'next';
import User from "../../components/layout/User";
import Head from "next/head";
import { useEffect, useState } from 'react';
import { UsePage } from '../../hooks/useMutation';
import { withQuery } from '../../hoc/withQuery';
import ModalCreateKanji from "../../components/modal/ModalCreateKanji";
import { GoPlus, GoSearch } from 'react-icons/go'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { isEmptyObject } from "../../utils/Validate";
import { withNotif } from '../../hoc/withNotif';
import { GridView } from "../../components/widget/Pagination"
import { useDebounce } from '../../hooks/helper';


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
    search: string;
}

const Kanji: NextPage<Props> = ({ notif }) => {

    const defaultPaginate = {
        page: 1,
        perPage: 10,
        search: "",
    }

    const [kanji, setKanji] = useState<{ [key: string]: any; }>({});
    const [show, setShow] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<number>(0);
    const [toogle, setToggle] = useState<boolean>(true);
    const [paginate, setPaginate] = useState<paginate>(defaultPaginate)
    const [search, setSearch] = useState("")
    const debounceSearch = useDebounce(search, 500)



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

    useEffect(() => {
        setPaginate({ ...paginate, search: debounceSearch })
    }, [debounceSearch])

    const gridView = GridView(paginate, setPaginate);

    const perPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setPaginate({ ...paginate, perPage: parseInt(event.target.value) })
    }

    const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value)
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
                    <span>Create</span>
                </button>
            </div>
            <div className={"flex flex-col px-4 py-2 w-full"}>
                <div className={"flex flex-row justify-between items-center mb-4"}>
                    <div className={"flex flex-row items-center"}>
                        <div className={""}>
                            Per Page
                        </div>
                        <div className={""}>
                            <select className={"p-2 w-16 rounded bg-transparent"} name="" id="" onChange={perPage}>
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="50">50</option>
                            </select>
                        </div>
                    </div>
                    <div className={"relative"}>
                        <div className={"absolute h-10 w-10 flex justify-center items-center right-0"}>
                            <GoSearch className={"text-gray-400"} size={"1.2em"} />
                        </div>
                        <input
                            type="text"
                            className={"w-full border-2 rounded h-10 pl-2 pr-10 bg-gray-100"}
                            placeholder={"Search"}
                            value={search}
                            onChange={handleChangeSearch}
                        />
                    </div>
                </div>
                <gridView.grid>
                    {isLoading ? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((data) => (
                        <gridView.loading key={data} />
                    )) : kanji.data && kanji.data.map((data, key) => {
                        return (
                            <gridView.data key={key} onClick={() => onClickOverlay(data.kanjiId)}>
                                <div className={"flex flex-row"}>
                                    <div className={"h-12 w-12 bg-gray-600 flex justify-center items-center rounded-full"}>
                                        <div className={"text-2xl font-light text-gray-100"}>
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
                            </gridView.data>
                        )
                    })}
                </gridView.grid>
                <gridView.paginate data={kanji} />
                <ModalCreateKanji
                    show={show}
                    onClickOverlay={onClickOverlay}
                    selectedId={selectedId}
                    notif={notif}
                />
            </div>
        </User>
    )
}

export default withNotif(withQuery(Kanji))

