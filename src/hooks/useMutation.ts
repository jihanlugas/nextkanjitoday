import { useMutation } from "react-query";
import Router from "next/router"
import { Api } from "../lib/Api"
import { FormikValues } from "formik";

interface Response {
    status: boolean;
    message: string;
    data: any;
    errors: any;
}


const logout = (res: Response) => {
    if (res && res.errors && res.errors.code == 401) {
        Router.push('/sign-in')
    }
}

export function UseLogin() {
    return useMutation((values: FormikValues) => Api.post("/login", values), {})
}

export function UseLogout() {
    return useMutation(() => Api.post("/logout"), {
        onSuccess: (res) => {
            logout(res)
        },
    })
}

export function UseAuth() {
    return useMutation(() => Api.post('/authorized'), {
        onSuccess: (res) => {
            logout(res)
        },
    })
}

export function UsePage(path : string) {
    return useMutation(() => Api.post(path), {
        onSuccess: (res) => {
            logout(res)
        },
    })
}

export function UseSubmitkanji() {
    return useMutation((values: FormikValues) => values.kanjiId === 0 ? Api.post("/kanji/store", values) : Api.put("/kanji/update", values), {
        onSuccess: (res) => {
            logout(res)
        },
    })
}

export function UseKanjiForm() {
    return useMutation((kanjiId:number) => Api.post("/kanji/form", {kanjiId}), {
        onSuccess: (res) => {
            logout(res)
        },
    })
}



export function UseSubmitword() {
    return useMutation((values: FormikValues) => values.wordId === 0 ? Api.post("/word/store", values) : Api.put("/word/update", values), {
        onSuccess: (res) => {
            logout(res)
        },
    })
}

export function UseWordForm() {
    return useMutation((wordId:number) => Api.post("/word/form", {wordId}), {
        onSuccess: (res) => {
            logout(res)
        },
    })
}