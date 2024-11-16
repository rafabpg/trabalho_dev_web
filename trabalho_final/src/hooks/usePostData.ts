import React from 'react'
import { useMutation } from 'react-query'
import { HttpClient } from '../services/axiosAdapter'

type PostDataProps<T = unknown> = {
    httpClient: HttpClient,
    data: T,
    url: string
}
const usePostData = () => {
  
    const mutation = useMutation(
        async ({httpClient, data, url}:PostDataProps) => {
            await httpClient.request({
                url: url,
                method: 'post',
                body: data
            })
        }
    )

    return {
        ...mutation,
    }


}

export default usePostData;