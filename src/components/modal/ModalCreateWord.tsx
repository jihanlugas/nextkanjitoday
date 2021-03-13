import { NextPage, } from "next";
import Modal from "./Modal";
import { Form, Formik, FieldArray, FormikValues, ArrayHelpers, FormikErrors } from "formik";
import TextAreaField from "../formik/TextAreaField";
import ButtonSubmit from "../formik/ButtonSubmit";
import Dropdown from "../formik/Dropdown";
import { UseSubmitword, UseWordForm } from "../../hooks/useMutation";
import { JLPT, YOMI_TYPE } from "../../utils/Constant";
import { TiTimes } from 'react-icons/ti'
import { useEffect, useState } from "react";
import * as Yup from 'yup';
import { isEmptyObject } from "../../utils/Validate";
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

let schema = Yup.object().shape({
    word: Yup.string().required(),
    kana: Yup.string().required(),
    mean: Yup.string().required(),
    hints: Yup.array().of(
        Yup.object().shape({
            hintId: Yup.number().positive().integer(),
            hint: Yup.string().required(),
        })
    ),
});


interface Props {
    show: boolean;
    onClickOverlay: Function;
    selectedId: number;
    notif: {
        error: Function,
        info: Function,
        success: Function,
        warning: Function,
    };
}


const ModalCreateWord: NextPage<Props> = ({ show, onClickOverlay, selectedId = 0, notif }) => {

    const initDefault = {
        wordId: 0,
        word: "",
        mean: "",
        kana: "",
        hints: [],
    }

    const defaultHint = {
        hintId: "",
        hint: "",
    }

    const [init, setInit] = useState<any>({});

    const submit = UseSubmitword()
    const form = UseWordForm()

    const [hint, setHint] = useState(defaultHint)


    const handleAddhint = (arrayHelpers: ArrayHelpers) => {
        arrayHelpers.push(hint)
        setHint(defaultHint)
    }

    const handleChangehint = (event) => {
        setHint({ ...hint, hint: event.target.value })
    }

    const handleSubmit = (values: FormikValues, setErrors) => {
        submit.mutate(values, {
            onSuccess: (res) => {
                if (res.success) {
                    notif.success(res.message)
                    setInit({})
                    onClickOverlay(0, true)
                } else if (res.errors) {
                    notif.error(res.message)
                    res.errors.validate && setErrors(res.errors.validate)
                }
            },
            onError: (error) => {
                console.log(error)
            }
        })
    }

    useEffect(() => {
        if (show) {
            if (selectedId === 0) {
                setInit(initDefault)
            } else {
                form.mutate(selectedId, {
                    onSuccess: (res) => {
                        if (res.success) {
                            setInit(res.data)
                        } else if (res.errors) {
                            console.log("res.errors => ", res.errors)
                        }
                    }
                })
            }
        }
    }, [selectedId, show])

    return (
        <Modal show={show} onClickOverlay={onClickOverlay}>
            <div className={"w-full h-full p-4"}>
                {isEmptyObject(init) || form.isLoading ? (
                    <div className={"w-full h-full flex justify-center items-center"}>
                        <AiOutlineLoading3Quarters className={"animate-spin"} size={"4em"} />
                    </div>
                ) : (
                        <Formik
                            initialValues={init}
                            enableReinitialize={true}
                            onSubmit={(values, { setErrors }) => handleSubmit(values, setErrors)}
                            validationSchema={schema}
                        >
                            {({ values, errors }) => {
                                return (
                                    <Form className={"flex flex-col w-full"}>
                                        <div className={"flex justify-between items-center text-xl mb-2"}>
                                            Word
                                        </div>
                                        <div className={"w-full grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4"}>
                                            <div className={"flex w-full"}>
                                                <TextAreaField
                                                    label={"Word"}
                                                    name={"word"}
                                                    type={"text"}
                                                />
                                            </div>
                                            <div className={"flex w-full"}>
                                                <TextAreaField
                                                    label={"Kana"}
                                                    name={"kana"}
                                                    type={"text"}
                                                />
                                            </div>
                                            <div className={"flex w-full"}>
                                                <TextAreaField
                                                    label={"Mean"}
                                                    name={"mean"}
                                                    type={"text"}
                                                />
                                            </div>
                                        </div>
                                        <div className={"w-full grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4"}>
                                            <div className={"flex w-full border rounded p-4"}>
                                                <FieldArray
                                                    name={"hints"}
                                                >
                                                    {(arrayHelpers) => {
                                                        return (
                                                            <div className={"w-full grid grid-cols-1 gap-4"}>
                                                                <div>Hint</div>
                                                                <div className={"flex w-full flex-wrap flex-row p-2 border rounded"}>
                                                                    {values.hints && values.hints.length > 0 ? (
                                                                        values.hints.map((hint, key) => (
                                                                            <div className={"flex flex-row items-center bg-gray-600 rounded px-1 mx-1 mb-1 h-6"} key={key}>
                                                                                <div className={"text-gray-100 text-sm font-bold"}>
                                                                                    {hint.hint}
                                                                                </div>
                                                                                <div className={"text-gray-100 text-sm font-bold ml-2"} onClick={() => arrayHelpers.remove(key)}>
                                                                                    <TiTimes size={"1.5em"} />
                                                                                </div>
                                                                            </div>
                                                                        ))
                                                                    ) : (
                                                                            <div>No Data Hint</div>
                                                                        )}
                                                                </div>
                                                                <div>
                                                                    <input
                                                                        className={"w-full border-2 rounded h-10 px-2 bg-gray-50"}
                                                                        type="text"
                                                                        value={hint.hint}
                                                                        onChange={handleChangehint}
                                                                        placeholder={"Add hint"}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => handleAddhint(arrayHelpers)}
                                                                        className={'bg-green-400 h-10 rounded-md text-gray-50 font-bold px-4 w-full'}
                                                                    >
                                                                        Add Hint
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        )
                                                    }}
                                                </FieldArray>
                                            </div>
                                        </div>
                                        {/* <div className={"flex mb-4"}>
                                            {JSON.stringify(errors, null, 4)}
                                        </div>

                                        <div className={"flex mb-4"}>
                                            {JSON.stringify(values, null, 4)}
                                        </div> */}
                                        <div className={"flex mb-4"}>
                                            <ButtonSubmit
                                                label={"Save"}
                                                disabled={submit.isLoading}
                                            />
                                        </div>
                                    </Form>
                                )
                            }}
                        </Formik>
                    )}
            </div>
        </Modal>
    )
}

export default ModalCreateWord;