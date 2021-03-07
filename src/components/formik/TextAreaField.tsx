import { Field, ErrorMessage } from "formik";
import { NextPage } from "next";

interface Props {
    label: string;
    name: string;
    type: string;
    placeholder?: string;
}

const TextAreaField: NextPage<Props> = ({ label, name, type, placeholder = 'Enter' }) => {
    return (
        <div className={"flex flex-col w-full"}>
            {label && (
                <div className={""}>
                    { label}
                </div>
            )}
            <Field
                as={"textarea"}
                className={"w-full border-2 rounded h-10 p-2 bg-gray-50 h-20"}
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

export default TextAreaField;