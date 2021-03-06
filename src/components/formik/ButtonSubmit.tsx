import { NextPage } from "next";
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

interface Props {
    label: string;
    disabled: boolean
}

const ButtonSubmit: NextPage<Props> = ({ label, disabled = false }) => {
    return (
        <button
            className={'bg-green-400 h-10 rounded-md text-gray-50 font-bold px-4 w-full hover:bg-green-500 disabled:bg-green-500'}
            type={'submit'}
            disabled={disabled}
        >
            {disabled ? (
                <div className={"flex justify-center items-center"}>
                    <AiOutlineLoading3Quarters className={"animate-spin"} size={"1.5em"} />
                </div>
            ) : (
                    <div className={"flex justify-center items-center"}>
                        {label}
                    </div>
                )
            }
        </button>
    )
}

export default ButtonSubmit;