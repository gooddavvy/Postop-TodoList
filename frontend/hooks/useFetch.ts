import axios, { AxiosResponse } from "axios";

export type Response = Promise<AxiosResponse<any, any>>;

export default function useFetch(url: string): Response {
    return axios.get(url)
        .then((res) => {
            if (res.status === 200) {
                return res.data as AxiosResponse;
            } else {
                throw new Error(`Request failed with status: ${res.status}`);
            }
        });
}
