import { Field } from "formik";
import { NextPage } from "next";

interface Props {
    label: string;
}

const ButtonSubmit: NextPage<Props> = ({ label }) => {
    return (
        <button
            className={'bg-green-400 h-10 rounded-md text-gray-50 font-bold px-4 w-full hover:bg-green-500'}
            type={'submit'}
        >
            {label}
        </button>
    )
}

export default ButtonSubmit;