import { FastField, ErrorMessage } from "formik";
import { NextPage } from "next";

interface Props {
    label: string;
    name: string;
    type: string;
    placeholder?: string;
}

const TextField: NextPage<Props> = ({ label, name, type, placeholder = 'Enter' }) => {
    return (
        <div className={"flex flex-col w-full"}>
            {label && (
                <div className={""}>
                    { label}
                </div>
            )}
            <FastField
                className={"w-full border-2 rounded h-10 px-2 bg-gray-50"}
                type={type}
                name={name}
                placeholder={placeholder}
            />
            <ErrorMessage name={name}>
                {(msg) => {
                    return (
                        <div style={{ color: 'red' }}>{msg}</div>
                    )
                }}
            </ErrorMessage>
        </div>
    )
}

export default TextField;