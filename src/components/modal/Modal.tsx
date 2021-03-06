import { NextPage } from "next";
import styles from "./modal.module.scss";


interface Props {
    children: React.ReactNode;
    show: boolean;
    onClickOverlay: Function;
}


const Modal: NextPage<Props> = ({ children, show, onClickOverlay }) => {
    return (
        <div className={show ? "z-10 inset-0 overflow-y-auto fixed" : "hidden"} >
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:p-0">
                <div className="fixed inset-0 transition-opacity" onClick={() => onClickOverlay()} aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-full sm:max-w-xl lg:max-w-4xl" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                    <div className={styles.container}>
                        <div className="sm:flex sm:items-start w-full h-full">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;