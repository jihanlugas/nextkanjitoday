import { FastField, Field, ErrorMessage } from "formik";
import { stringify } from "querystring";
import { NextPage } from "next";

interface Props {
    label: string;
    name: string;
    items: any[];
    itemKey: string;
    itemLabel: string;
    prompt: string;
}

const Dropdown: NextPage<Props> = ({ label, name, items, itemKey, itemLabel, prompt = "" }) => {
    return (
        <div className={"flex flex-col w-full mb-4"}>
            {label && (
                <div className={""}>
                    { label}
                </div>
            )}
            <Field
                as={"select"}
                className={"w-full border-2 rounded h-10 px-2 bg-gray-50"}
                name={name}
            >
                {prompt && (
                    <option value={""}>{prompt}</option>
                )}
                {items.map((item, key) => (

                    <option key={key} value={item[itemKey]}>{item[itemLabel]}</option>
                ))}
            </Field>

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

export default Dropdown;