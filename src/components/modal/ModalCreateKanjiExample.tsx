import { NextPage, } from "next";
import Modal from "./Modal";
import { Form, Formik, FieldArray, FormikValues, ArrayHelpers, FormikErrors } from "formik";
import TextField from "../formik/TextField";
import ButtonSubmit from "../formik/ButtonSubmit";
import Dropdown from "../formik/Dropdown";
import { UseSubmitkanji, UseKanjiForm } from "../../hooks/useMutation";
import { JLPT, YOMI_TYPE } from "../../utils/Constant";
import { TiTimes } from 'react-icons/ti'
import { useEffect, useState } from "react";
import * as Yup from 'yup';
import { isEmptyObject } from "../../utils/Validate";
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

let schema = Yup.object().shape({
    word: Yup.string().required(),
    strokes: Yup.number(),
    jlpt: Yup.string(),
    kanjiyomis: Yup.array().of(
        Yup.object().shape({
            kanjiId: Yup.number().positive().integer(),
            word: Yup.string().required(),
            type: Yup.string(),
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
    selectedId: number;
}


const ModalCreateKanji: NextPage<Props> = ({ show, onClickOverlay, selectedId = 0 }) => {

    const [init, setInit] = useState<any>({});

    const submit = UseSubmitkanji()
    const form = UseKanjiForm()

    const defaultKanjiyomi = {
        kanjiyomiId: '',
        kanjiId: '',
        word: '',
        type: 'ONYOMI',
    }

    const defaultKanjimean = {
        kanjimeanId: '',
        kanjiId: '',
        mean: '',
    }

    const [kanjiyomi, setKanjiyomi] = useState(defaultKanjiyomi)
    const [kanjimean, setKanjimean] = useState(defaultKanjimean)

    const handleAddyomi = (arrayHelpers: ArrayHelpers) => {
        arrayHelpers.push(kanjiyomi)
        setKanjiyomi(defaultKanjiyomi)
    }

    const handleAddmean = (arrayHelpers: ArrayHelpers) => {
        arrayHelpers.push(kanjimean)
        setKanjimean(defaultKanjimean)
    }

    const handleChangeyomiword = (event) => {
        setKanjiyomi({ ...kanjiyomi, word: event.target.value })
    }

    const handleChangeyomitype = (event) => {
        setKanjiyomi({ ...kanjiyomi, type: event.target.value })
    }

    const handleChangemean = (event) => {
        setKanjimean({ ...kanjimean, mean: event.target.value })
    }


    const handleSubmit = (values: FormikValues, setErrors) => {
        submit.mutate(values, {
            onSuccess: (res) => {
                console.log("res => ", res)
                if (res.success) {
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
            setInit({
                kanjiId: 0,
                word: "",
                strokes: "",
                jlpt: "",
                kanjiyomis: [],
                kanjimeans: [],
            })
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
                                                    itemKey={"id"}
                                                    itemLabel={"name"}
                                                    prompt={"Select"}
                                                />
                                            </div>
                                        </div>
                                        <div className={"w-full grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4"}>
                                            <div className={"flex w-full border rounded p-4"}>
                                                <FieldArray
                                                    name={"kanjiyomis"}
                                                >
                                                    {(arrayHelpers) => {
                                                        return (
                                                            <div className={"w-full grid grid-cols-1 gap-4"}>
                                                                <div>Yomi</div>
                                                                <div className={"flex w-full flex-wrap flex-row p-2 border rounded"}>
                                                                    {values.kanjiyomis && values.kanjiyomis.length > 0 ? (
                                                                        values.kanjiyomis.map((kanjiyomi, key) =>
                                                                            kanjiyomi.type === "ONYOMI" ? (
                                                                                <div className={"flex flex-row items-center bg-green-600 rounded px-1 mx-1 mb-1 h-6"} key={key}>
                                                                                    <div className={"text-gray-100 text-sm font-bold"}>
                                                                                        {kanjiyomi.word}
                                                                                    </div>
                                                                                    <div className={"text-gray-100 text-sm font-bold ml-2"} onClick={() => arrayHelpers.remove(key)}>
                                                                                        <TiTimes size={"1.5em"} />
                                                                                    </div>
                                                                                </div>
                                                                            ) : (
                                                                                    <div className={"flex flex-row items-center bg-blue-600 rounded px-1 mx-1 mb-1 h-6"} key={key}>
                                                                                        <div className={"text-gray-100 text-sm font-bold"}>
                                                                                            {kanjiyomi.word}
                                                                                        </div>
                                                                                        <div className={"text-gray-100 text-sm font-bold ml-2"} onClick={() => arrayHelpers.remove(key)}>
                                                                                            <TiTimes size={"1.5em"} />
                                                                                        </div>
                                                                                    </div>
                                                                                ))
                                                                    ) : (
                                                                            <div>No Data yomi</div>
                                                                        )}
                                                                </div>
                                                                <div>
                                                                    <input
                                                                        className={"w-full border-2 rounded h-10 px-2 bg-gray-50"}
                                                                        type="text"
                                                                        value={kanjiyomi.word}
                                                                        onChange={handleChangeyomiword}
                                                                        placeholder={"Add yomi"}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <select
                                                                        className={"w-full border-2 rounded h-10 px-2 bg-gray-50"}
                                                                        onChange={handleChangeyomitype}
                                                                        value={kanjiyomi.type}
                                                                    >
                                                                        {YOMI_TYPE.map((data, key) => (
                                                                            <option value={data.id} key={key} >{data.name}</option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                                <div>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => handleAddyomi(arrayHelpers)}
                                                                        className={'bg-green-400 h-10 rounded-md text-gray-50 font-bold px-4 w-full hover:bg-green-500'}
                                                                    >
                                                                        Add yomi
                                                    </button>
                                                                </div>
                                                            </div>
                                                        )
                                                    }}
                                                </FieldArray>
                                            </div>
                                            <div className={"flex w-full border rounded p-4"}>
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
                                        <div className={"flex mb-4"}>
                                            <ButtonSubmit
                                                label={"Save"}
                                                disabled={submit.isLoading}
                                            />
                                        </div>

                                        {/* <div className={"flex justify-between items-center text-xl mb-2"}>
                                        <div className={"block"}>
                                            {JSON.stringify(errors, null, 4)}
                                        </div>
                                    </div> */}
                                    </Form>
                                )
                            }}
                        </Formik>
                    )}
            </div>
        </Modal>
    )
}

export default ModalCreateKanji;