import { Fragment } from 'react'

const Main = ({ children } : { children: React.ReactNode}) => {
    return (
        <Fragment>
            <div className="app flex min-h-screen bg-gray-200 w-full">
                {children}
            </div>
        </Fragment>
    )
}

export default Main
