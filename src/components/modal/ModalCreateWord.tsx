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
    hint: Yup.string(),
});


interface Props {
    show: boolean;
    onClickOverlay: Function;
    selectedId: number;
}


const ModalCreateWord: NextPage<Props> = ({ show, onClickOverlay, selectedId = 0 }) => {

    const initDefault = {
        wordId: 0,
        word: "",
        mean: "",
        hint: "",
    }

    const [init, setInit] = useState<any>({});

    const submit = UseSubmitword()
    const form = UseWordForm()


    const handleSubmit = (values: FormikValues, setErrors) => {
        submit.mutate(values, {
            onSuccess: (res) => {
                if (res.success) {
                    setInit(initDefault)
                    onClickOverlay(0, true)
                } else if (res.errors) {
                    res.errors.validate && setErrors(res.errors.validate)
                }
            },
            onError: (error) => {
                console.log(error)
            }
        })
    }

    useEffect(() => {
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
    }, [selectedId])

    return (
        <Modal show={show} onClickOverlay={onClickOverlay}>
            <div className={"w-full h-full p-4"}>
                {isEmptyObject(init) ? (
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
                                            Create
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
                                            <div className={"flex w-full"}>
                                                <TextAreaField
                                                    label={"Hint"}
                                                    name={"hint"}
                                                    type={"text"}
                                                />
                                            </div>
                                        </div>
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