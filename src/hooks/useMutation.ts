import { useMutation } from "react-query";
import Router from "next/router"
import { Api } from "../lib/Api"
import { FormikValues } from "formik";

const logout = (data: any) => {
    if (data.logout) {
        Router.push('/sign-in')
    }
}

export function UseLogin() {
    return useMutation((values: FormikValues) => Api.post("/login", values), {})
}

export function UseLogout() {
    return useMutation(() => Api.post("/logout"), {
        onSuccess: (data) => {
            logout(data)
        },
    })
}

export function UseAuth() {
    return useMutation(() => Api.post('/authorized'), {
        onSuccess: (data) => {
            logout(data)
        },
    })
}

export function UsePage() {
    return useMutation(() => Api.post("/page/kanji"), {
        onSuccess: (data) => {
            logout(data)
        },
    })
}

export function UseSubmitkanji() {
    return useMutation((values: FormikValues) => Api.post("/kanji/store", values), {
        onSuccess: (data) => {
            logout(data)
        },
    })
}