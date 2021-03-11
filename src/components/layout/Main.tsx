import React, { Fragment } from 'react'
import Head from "next/head"
import { NextPage } from 'next'

interface Props {
    children: React.ReactNode
}

const Main: NextPage<Props> = ({ children }) => {
    return (
        <Fragment>
            <div className="app flex min-h-screen bg-gray-200 w-full">
                {children}
            </div>
        </Fragment>
    )
}

export default Main
