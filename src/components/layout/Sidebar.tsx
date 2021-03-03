import { NextPage } from 'next';
import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react'
import { GoThreeBars } from 'react-icons/go'
import { withQuery } from "../../hoc/withQuery";
import { UseAuth } from "../../hooks/useMutation";


interface Props {
    onClickOverlay: Function;
    show: boolean;
}


const Sidebar: NextPage<Props> = ({ onClickOverlay, show }) => {


    const [authMenu, setAuthMenu] = useState([])

    const { isLoading, mutate, error } = UseAuth()

    useEffect(() => {
        mutate(null, {
            onSuccess: (data) => {
                if (data.success) {
                    setAuthMenu(data.payload)
                }
            },
            onError: (err) => {
                console.log('err => ', err)
            }
        })
    }, [])


    return (
        <div className={show ? "z-10 inset-0 overflow-y-auto fixed" : "hidden"} >
            <div className="min-h-screen text-center p-0">
                <div className="fixed inset-0 transition-opacity" onClick={() => onClickOverlay()} aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <div className="fixed bg-white h-screen flex w-4/5 sm:w-80">
                    <div className={'flex bg-white flex-col w-full'}>
                        <div className="h-16 flex justify-center items-center bg-green-400">
                            <span className="text-3xl">{process.env.API_NAME}</span>
                        </div>
                        <div className="py-4">
                            {authMenu.map((menu, index) => {
                                return (
                                    <Link href={menu.path} key={index}>
                                        <a>
                                            <div className="p-4 hover:bg-gray-200 w-full flex items-center">
                                                <div className="flex justify-center items-center h-4 w-4 mr-2">
                                                    <GoThreeBars size={"2em"} />
                                                </div>
                                                <div>
                                                    <span>{menu.name}</span>
                                                </div>
                                            </div>
                                        </a>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withQuery(Sidebar)