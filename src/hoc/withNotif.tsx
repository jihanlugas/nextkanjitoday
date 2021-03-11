import { NextPage } from 'next';
import { AppContext } from 'next/app';
import React from 'react'
import notifStyle from "../pages/styles/notif.module.scss";

interface Props {
    children: React.ReactNode
    notif: {
        error: Function,
        info: Function,
        success: Function,
        warning: Function,
    }
}

const Init: NextPage<Props> = ({ children, notif }) => {

    const childrenWithProps = React.Children.map(children, child => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { notif: notif });
        }
        return child;
    });


    return (
        <div className="flex">
            {childrenWithProps}
        </div>
    )
}

export function withNotif(Component) {
    const ComponentWrapper = props => {

        const [showNotif, setShowNotif] = React.useState({
            show: false,
            title: "",
            msg: "",
            className: ""
        });

        React.useEffect(() => {
            if (showNotif.show) {
                setTimeout(() => {
                    setShowNotif({ ...showNotif, show: false });
                }, 3000)
            }
        }, [showNotif]);

        const notif = {
            error: (msg: string) => {
                setShowNotif({
                    show: true,
                    title: "Error",
                    msg: msg,
                    className: "error"
                });
            },
            info: (msg: string) => {
                setShowNotif({
                    show: true,
                    title: "Info",
                    msg: msg,
                    className: "info"
                });
            },
            success: (msg: string) => {
                setShowNotif({
                    show: true,
                    title: "Success",
                    msg: msg,
                    className: "success"
                });
            },
            warning: (msg: string) => {
                setShowNotif({
                    show: true,
                    title: "Warning",
                    msg: msg,
                    className: "warning"
                });
            },
        }


        return (
            <Init notif={notif}>
                <div className={showNotif.show === false ? [notifStyle.notif].join(" ") : [notifStyle.notif, notifStyle.active].join(" ")}>
                    <div className={[notifStyle.notifContainer].join(" ")}>
                        <div className={[notifStyle.notifContent, notifStyle[showNotif.className]].join(" ")}>
                            <div className={[notifStyle.title].join(" ")}>{showNotif.title}</div>
                            <div className={[].join(" ")}>{showNotif.msg}</div>
                        </div>
                    </div>

                </div>
                <Component {...props} notif={notif} />
            </Init>
        )
    }
    return ComponentWrapper;
}
