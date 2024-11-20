import { useQuery } from "@tanstack/react-query"
import { HttpClient } from "../services/axiosAdapter"

type getDataProps =  {
    httpClient: HttpClient,
    url:string,
    page?:number,
    size?:number
}

const useGetData = ({ httpClient, url, page , size }: getDataProps) => {
    const { data, isLoading, error } = useQuery({
      queryKey: ['getData', url, page, size], 
      queryFn: async () => {
        const queryParams = new URLSearchParams();
        if (page !== undefined) queryParams.append('page', page.toString());
        if (size !== undefined) queryParams.append('size', size.toString());
  
        const response = await httpClient.request({
          url: `${url}?${queryParams.toString()}`,
          method: "get",
        });
        return { data: response.body, status: response.statusCode };
      },
      keepPreviousData: true
    });
  
    return { data, isLoading, error }; 
  };

export default useGetData