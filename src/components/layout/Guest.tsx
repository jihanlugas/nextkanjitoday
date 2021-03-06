import { Fragment } from 'react'
import Main from "./Main"

const Guest = ({ children }: { children: React.ReactNode }) => {
    return (
        <Main>
            <div className="flex">
                {children}
            </div>
        </Main>
    )
}

export default Guest
