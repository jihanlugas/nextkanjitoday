import axios, { CancelToken } from 'axios';
import { error } from 'console';
import { NextApiResponse } from 'next';
import { toCamel } from "snake-camel";


type thisProps = {
    requestPath: string,
    payload: object,
}

const appPayLoad = {
    appid: process.env.APP_ID,
    appVersion: process.env.APP_VERSION
};

class Api {
    static get = (requestPath: string, payload?: {}) => {
        payload = { ...payload, ...appPayLoad };
        const url = "/api" + requestPath;

        const request = axios.request({
            url: url,
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            params: payload,
            timeout: 20000,
            responseType: 'json',
        }).then((res: { data: any; }) => toCamel(res.data), (error: { response: { data: any; status: any; }; }) => error.response.data);

        return request;
    }

    static post = (requestPath: string, payload?: {}) => {
        payload = { ...payload, ...appPayLoad };
        const url = "/api" + requestPath;

        const request = axios.request({
            url: url,
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            data: payload,
            timeout: 20000,
            responseType: 'json',
        }).then((res: { data: any; }) => toCamel(res.data), (error: { response: { data: any; status: any; }; }) => error.response.data);

        return request;
    }
    
    static put = (requestPath: string, payload?: {}) => {
        payload = { ...payload, ...appPayLoad };
        const url = "/api" + requestPath;

        const request = axios.request({
            url: url,
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            data: payload,
            timeout: 20000,
            responseType: 'json',
        }).then((res: { data: any; }) => toCamel(res.data), (error: { response: { data: any; status: any; }; }) => error.response.data);

        return request;
    }

    static delete = (requestPath: string, payload?: {}) => {
        payload = { ...payload, ...appPayLoad };
        const url = "/api" + requestPath;

        const request = axios.request({
            url: url,
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            data: payload,
            timeout: 20000,
            responseType: 'json',
        }).then((res: { data: any; }) => toCamel(res.data), (error: { response: { data: any; status: any; }; }) => error.response.data);

        return request;
    }
}

export { Api }