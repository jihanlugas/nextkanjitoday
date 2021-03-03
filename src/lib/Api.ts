import axios, { CancelToken } from 'axios';
import { error } from 'console';
import { NextApiResponse } from 'next';


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
        return Api._fetch('get', requestPath, payload)
    }

    static post = (requestPath: string, payload?: {}) => {
        return Api._fetch('post', requestPath, payload)
    }
    
    static put = (requestPath: string, payload?: {}) => {
        return Api._fetch('put', requestPath, payload)
    }

    static delete = (requestPath: string, payload?: {}) => {
        return Api._fetch('delete', requestPath, payload)
    }

    static _fetch = (method: string, requestPath: string, payload: {} = {} ) => {
        payload = { ...payload, ...appPayLoad };

        const dataKey = (method === 'get') ? 'params' : 'data';
        const url = "http://localhost:3000/api" + requestPath;

        
        const request = axios.request({
            url: url,
            method: "post",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            [dataKey]: payload,
            timeout: 20000,
            responseType: 'json',
        }).then((res: { data: any; }) => res.data, (error: { response: { data: any; status: any; }; }) => error.response.data);

        return request;

    }
}

export { Api }