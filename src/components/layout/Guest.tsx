import { NextPage } from 'next';
import { AppContext } from 'next/app';
import React from 'react'
import Main from "./Main"


interface Props {
    children: React.ReactNode
}

const Guest: NextPage<Props> = ({ children }) => {
    return (
        <Main>
            <div className="flex">
                {children}
            </div>
        </Main>
    )
}

export default Guest