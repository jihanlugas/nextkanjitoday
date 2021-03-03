import { NextPage, } from "next";
import Modal from "./Modal";
import { Form, Formik, FieldArray, FormikValues, ArrayHelpers, FormikErrors } from "formik";
import TextField from "../formik/TextField";
import ButtonSubmit from "../formik/ButtonSubmit";
import Dropdown from "../formik/Dropdown";
import { UseSubmitkanji } from "../../hooks/useMutation";
import { JLPT } from "../../utils/Constant";
import { TiTimes } from 'react-icons/ti'
import { useState } from "react";
import * as Yup from 'yup';


let schema = Yup.object().shape({
    word: Yup.string().required(),
    strokes: Yup.number(),
    jlpt: Yup.number(),
    kanjionyomis: Yup.array().of(
        Yup.object().shape({
            kanjiId: Yup.number().positive().integer(),
            word: Yup.string().required(),
            type: Yup.number(),
        })
    ),
    kanjikunyomis: Yup.array().of(
        Yup.object().shape({
            kanjiId: Yup.number().positive().integer(),
            word: Yup.string().required(),
            type: Yup.number(),
        })
    ),
    kanjimeans: Yup.array().of(
        Yup.object().shape({
            kanjiId: Yup.number().positive().integer(),
            mean: Yup.string().required(),
        })
    ),
});


interface Props {
    show: boolean;
    onClickOverlay: Function;
}


const ModalCreateKanji: NextPage<Props> = ({ show, onClickOverlay }) => {

    const init = {
        kanjiId: "",
        word: "",
        strokes: "",
        jlpt: "",
        kanjionyomis: [],
        kanjikunyomis: [],
        kanjimeans: [],
    }

    const { mutate, isLoading, isError } = UseSubmitkanji()

    const defaultKanjionyomi = {
        kanjionyomiId: '',
        kanjiId: '',
        word: '',
        type: '',
    }

    const defaultKanjikunyomi = {
        kanjikunyomiId: '',
        kanjiId: '',
        word: '',
        type: '',
    }

    const defaultKanjimean = {
        kanjimeanId: '',
        kanjiId: '',
        mean: '',
    }

    const [kanjionyomi, setKanjionyomi] = useState(defaultKanjionyomi)
    const [kanjikunyomi, setKanjikunyomi] = useState(defaultKanjikunyomi)
    const [kanjimean, setKanjimean] = useState(defaultKanjimean)

    const handleAddonyomi = (arrayHelpers: ArrayHelpers) => {
        arrayHelpers.push(kanjionyomi)
        setKanjionyomi(defaultKanjionyomi)
    }

    const handleAddkunyomi = (arrayHelpers: ArrayHelpers) => {
        arrayHelpers.push(kanjikunyomi)
        setKanjikunyomi(defaultKanjikunyomi)
    }

    const handleAddmean = (arrayHelpers: ArrayHelpers) => {
        arrayHelpers.push(kanjimean)
        setKanjimean(defaultKanjimean)
    }

    const handleChangeonyomiword = (event) => {
        setKanjionyomi({ ...kanjionyomi, word: event.target.value })
    }

    const handleChangekunyomiword = (event) => {
        setKanjikunyomi({ ...kanjikunyomi, word: event.target.value })
    }

    const handleChangemean = (event) => {
        setKanjimean({ ...kanjimean, mean: event.target.value })
    }


    const handleSubmit = (values: FormikValues) => {
        mutate(values, {
            onSuccess: (data) => {
                console.log(data)
            },
            onError: (error) => {
                console.log(error)
            }
        })
    }

    return (
        <Modal show={show} onClickOverlay={onClickOverlay}>
            <Formik
                initialValues={init}
                enableReinitialize={true}
                onSubmit={handleSubmit}
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
                                    <TextField
                                        label={"Word"}
                                        name={"word"}
                                        type={"text"}
                                    />
                                </div>
                                <div className={"flex w-full"}>
                                    <TextField
                                        label={"Strokes"}
                                        name={"strokes"}
                                        type={"number"}
                                    />
                                </div>
                                <div className={"flex w-full"}>
                                    <Dropdown
                                        label={"JLPT"}
                                        name={"jlpt"}
                                        items={JLPT}
                                        itemKey={"key"}
                                        itemLabel={"name"}
                                        prompt={"Select"}
                                    />
                                </div>
                            </div>
                            <div className={"w-full grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4"}>
                                <div className={"flex w-full"}>
                                    <FieldArray
                                        name={"kanjionyomis"}
                                    >
                                        {(arrayHelpers) => {
                                            return (
                                                <div className={"w-full grid grid-cols-1 gap-4"}>
                                                    <div>Onyomi</div>
                                                    <div className={"flex w-full flex-wrap flex-row p-2 border rounded"}>
                                                        {values.kanjionyomis && values.kanjionyomis.length > 0 ? (
                                                            values.kanjionyomis.map((kanjionyomi, key) => (
                                                                <div className={"flex flex-row items-center bg-green-600 rounded px-1 mx-1 mb-1 h-6"} key={key}>
                                                                    <div className={"text-gray-100 text-sm font-bold"}>
                                                                        {kanjionyomi.word}
                                                                    </div>
                                                                    <div className={"text-gray-100 text-sm font-bold ml-2"} onClick={() => arrayHelpers.remove(key)}>
                                                                        <TiTimes size={"1.5em"} />
                                                                    </div>
                                                                </div>
                                                            ))
                                                        ) : (
                                                                <div>No Data Onyomi</div>
                                                            )}
                                                    </div>
                                                    <div>
                                                        <input
                                                            className={"w-full border-2 rounded h-10 px-2 bg-gray-50"}
                                                            type="text"
                                                            value={kanjionyomi.word}
                                                            onChange={handleChangeonyomiword}
                                                            placeholder={"Add Onyomi"}
                                                        />
                                                    </div>
                                                    <div>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleAddonyomi(arrayHelpers)}
                                                            className={'bg-green-400 h-10 rounded-md text-gray-50 font-bold px-4 w-full hover:bg-green-500'}
                                                        >
                                                            Add Onyomi
                                                    </button>
                                                    </div>
                                                </div>
                                            )
                                        }}
                                    </FieldArray>
                                </div>
                                <div className={"flex w-full"}>
                                    <FieldArray
                                        name={"kanjikunyomis"}
                                    >
                                        {(arrayHelpers) => {
                                            return (
                                                <div className={"w-full grid grid-cols-1 gap-4"}>
                                                    <div>Kunyomi</div>
                                                    <div className={"flex w-full flex-wrap flex-row p-2 border rounded"}>
                                                        {values.kanjikunyomis && values.kanjikunyomis.length > 0 ? (
                                                            values.kanjikunyomis.map((kanjikunyomi, key) => (
                                                                <div className={"flex flex-row items-center bg-blue-600 rounded px-1 mx-1 mb-1 h-6"} key={key}>
                                                                    <div className={"text-gray-100 text-sm font-bold"}>
                                                                        {kanjikunyomi.word}
                                                                    </div>
                                                                    <div className={"text-gray-100 text-sm font-bold ml-2"} onClick={() => arrayHelpers.remove(key)}>
                                                                        <TiTimes size={"1.5em"} />
                                                                    </div>
                                                                </div>
                                                            ))
                                                        ) : (
                                                                <div>No Data Kunyomi</div>
                                                            )}
                                                    </div>
                                                    <div>
                                                        <input
                                                            className={"w-full border-2 rounded h-10 px-2 bg-gray-50"}
                                                            type="text"
                                                            value={kanjikunyomi.word}
                                                            onChange={handleChangekunyomiword}
                                                            placeholder={"Add Kunyomi"}
                                                            onSubmit={(e) => {
                                                                e.preventDefault()
                                                                handleAddkunyomi(arrayHelpers)
                                                            }}
                                                        />
                                                    </div>
                                                    <div>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleAddkunyomi(arrayHelpers)}
                                                            className={'bg-green-400 h-10 rounded-md text-gray-50 font-bold px-4 w-full hover:bg-green-500'}
                                                        >
                                                            Add Kunyomi
                                                    </button>
                                                    </div>
                                                </div>
                                            )
                                        }}
                                    </FieldArray>
                                </div>
                                <div className={"flex w-full"}>
                                    <FieldArray
                                        name={"kanjimeans"}
                                    >
                                        {(arrayHelpers) => {
                                            return (
                                                <div className={"w-full grid grid-cols-1 gap-4"}>
                                                    <div>Mean</div>
                                                    <div className={"flex w-full flex-wrap flex-row p-2 border rounded"}>
                                                        {values.kanjimeans && values.kanjimeans.length > 0 ? (
                                                            values.kanjimeans.map((kanjimean, key) => (
                                                                <div className={"flex flex-row items-center bg-gray-600 rounded px-1 mx-1 mb-1 h-6"} key={key}>
                                                                    <div className={"text-gray-100 text-sm font-bold"}>
                                                                        {kanjimean.mean}
                                                                    </div>
                                                                    <div className={"text-gray-100 text-sm font-bold ml-2"} onClick={() => arrayHelpers.remove(key)}>
                                                                        <TiTimes size={"1.5em"} />
                                                                    </div>
                                                                </div>
                                                            ))
                                                        ) : (
                                                                <div>No Data mean</div>
                                                            )}
                                                    </div>
                                                    <div>
                                                        <input
                                                            className={"w-full border-2 rounded h-10 px-2 bg-gray-50"}
                                                            type="text"
                                                            value={kanjimean.mean}
                                                            onChange={handleChangemean}
                                                            placeholder={"Add mean"}
                                                        />
                                                    </div>
                                                    <div>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleAddmean(arrayHelpers)}
                                                            className={'bg-green-400 h-10 rounded-md text-gray-50 font-bold px-4 w-full hover:bg-green-500'}
                                                        >
                                                            Add Mean
                                                    </button>
                                                    </div>
                                                </div>
                                            )
                                        }}
                                    </FieldArray>
                                </div>
                            </div>

                            <div className={"flex"}>
                                <ButtonSubmit label={"Save"} />
                            </div>

                            <div className={"flex justify-between items-center text-xl mb-2"}>
                                <div className={"block"}>
                                    {JSON.stringify(errors, null, 4)}
                                </div>
                            </div>
                            {/* <div className="flex">
                                {JSON.stringify(values, null, 4)}
                            </div> */}
                        </Form>
                    )
                }}

            </Formik>
        </Modal>
    )
}

export default ModalCreateKanji;