import Head from "next/head";
import React from 'react';
import Guest from "../components/layout/Guest";
import { Form, Formik, FormikValues } from 'formik';
import TextField from "../components/formik/TextField";
import ButtonSubmit from "../components/formik/ButtonSubmit";
import Router from "next/router";
import { withQuery } from "../hoc/withQuery";
import { UseLogin } from "../hooks/useMutation";
import { NextPage } from "next";
import { withNotif } from "../hoc/withNotif";
import * as Yup from 'yup';

interface Props {
    notif: {
        error: Function,
        info: Function,
        success: Function,
        warning: Function,
    }
}

let schema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
});

const Signin: NextPage<Props> = ({ notif }) => {

    const initFormikValue = {
        email: process.env.IS_PRODUCTION !== undefined ? '' : 'jihanlugas2@gmail.com',
        password: process.env.IS_PRODUCTION !== undefined ? '' : '123456',
    }

    const { isLoading, mutate, error } = UseLogin()

    const handleSubmit = (values: FormikValues) => {
        mutate(values, {
            onSuccess: (res) => {
                if (res.success) {
                    Router.push("/dashboard")
                } else if (res.errors) {
                    notif.error(res.errors.message)
                }
            }
        })
    }

    return (
        <Guest>
            <Head>
                <title>{"Sign In"}</title>
            </Head>
            <div className="h-screen w-screen flex justify-center items-center">
                <div className="w-full max-w-md p-4">
                    <div className="bg-white rounded-xl p-4 shadow-lg">
                        <Formik
                            initialValues={initFormikValue}
                            validationSchema={schema}
                            enableReinitialize={true}
                            onSubmit={handleSubmit}
                        >
                            {() => {
                                return (
                                    <Form>
                                        <div className={"text-xl flex justify-center"}>
                                            Sign In
                                            </div>
                                        <div className="mb-4">
                                            <TextField
                                                label={"Email"}
                                                name={"email"}
                                                type={"email"}
                                                placeholder={"Email"}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <TextField
                                                label={"Password"}
                                                type={"password"}
                                                name={"password"}
                                                placeholder={"Password"}
                                            />
                                        </div>
                                        <div className={""}>
                                            <ButtonSubmit
                                                label={'Sign In'}
                                                disabled={isLoading}
                                            />
                                        </div>
                                    </Form>
                                )
                            }}
                        </Formik>
                    </div>
                </div>
            </div>
        </Guest>
    );
};

export default withNotif(withQuery(Signin));
