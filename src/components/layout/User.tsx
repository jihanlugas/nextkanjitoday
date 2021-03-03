import { Fragment, useState } from 'react'
import Main from "./Main"
import Header from "./Header"
import Sidebar from "./Sidebar"
import { withQuery } from "../../hoc/withQuery";

const User = ({ children }: { children: React.ReactNode }) => {

    const [show, setShow] = useState(false);

    const onClickOverlay = () => {
        setShow(!show)
    }

    return (
        <Main>
            <Sidebar show={show} onClickOverlay={onClickOverlay} />
            <div className={'w-full h-screen overflow-y-scroll'}>
                <Header onClickOverlay={onClickOverlay} />
                <div className="">
                    {children}
                </div>
            </div>
        </Main>
    )
}

export default User;
