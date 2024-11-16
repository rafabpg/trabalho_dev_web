import { AxiosError, AxiosResponse } from "axios";
import { axiosClient } from "./axiosClient";


type HttRequest = {
    url:string,
    method:string,
    body?:any
}

export interface HttpClient<R = any> {
    request(data:HttRequest):Promise<R>
}


export class AxiosHttpClientAdapter implements HttpClient {
    async  request(data:HttRequest){
        let axiosResponse:AxiosResponse;
        try {
            axiosResponse = await axiosClient.request({
                url: data.url,
                method: data.method,
                data: data.body,
            })
        } catch (error) {
            const _error = error as AxiosError<{message:string}>
            throw new Error(_error.response?.data.message)
        }
        return {
            statusCode:axiosResponse.status,
            body: axiosResponse?.data
        }
    }
}