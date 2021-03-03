import Head from "next/head";
import Guest from "../components/layout/Guest";
import { Form, Formik, FormikValues } from 'formik';
import TextField from "../components/formik/TextField";
import ButtonSubmit from "../components/formik/ButtonSubmit";
import Router from "next/router";
import { withQuery } from "../hoc/withQuery";
import { UseLogin } from "../hooks/useMutation";
import { NextPage } from "next";

interface Props {

}

const Signin: NextPage<Props> = ({ }) => {

    const initFormikValue = {
        email: 'jihanlugas2@gmail.coms',
        password: '123456',
    }

    const { isLoading, mutate, error } = UseLogin()

    const handleSubmit = (values: FormikValues) => {
        mutate(values, {
            onSuccess: (data) => {
                console.log('data => ', data)
                Router.push("/dashboard")
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

export default withQuery(Signin);
