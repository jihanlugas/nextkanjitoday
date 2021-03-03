import { Fragment } from 'react'
import { GoThreeBars } from 'react-icons/go'
import { withQuery } from "../../hoc/withQuery"
import { UseLogout } from "../../hooks/useMutation";
import Router from "next/router";
import { NextPage } from 'next';


interface Props {
    onClickOverlay: Function;
}

const Header: NextPage<Props> = ({ onClickOverlay }) => {

    const { mutate, isLoading, error } = UseLogout()

    const handleClick = () => {
        mutate(null, {
            onSuccess: (data) => {
                Router.push("/sign-in")
                console.log("data => ", data)
            },
            onError: (error) => {
                console.log("error => ", error)
            }
        })
    }

    return (
        <Fragment>
            <div className="h-16 p-4 bg-green-400 text-white flex justify-between items-center">
                <div className="-ml-2 flex justify-center items-center h-12 w-12 cursor-pointer" onClick={() => onClickOverlay()}>
                    <div className="flex justify-center items-center h-8 w-8 ">
                        <GoThreeBars size={"2em"} />
                    </div>
                </div>
                <div className="flex justify-center items-center h-12 w-12 cursor-pointer bg-blue-200">
                    <div className="flex justify-center items-center h-12 w-12 bg-red-200 rounded-full" onClick={handleClick}></div>
                </div>
            </div>
        </Fragment>
    )
}

export default withQuery(Header)