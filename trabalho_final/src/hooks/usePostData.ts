import { useMutation } from "@tanstack/react-query";
import { HttpClient } from "../services/axiosAdapter";
import { queryClient } from "../services/queryCliente";

type PostDataProps<T = unknown> = {
  httpClient: HttpClient;
  data: T;
  url: string;
};
const usePostData = () => {
  const mutation = useMutation({
    mutationFn: async ({ httpClient, data, url }: PostDataProps) => {
      const response = await httpClient.request({
        url: url,
        method: "post",
        body: data,
      });
      return { data: response.body, status: response.statusCode };
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['getData']);
      queryClient.invalidateQueries(['infiniteGetData']);
    },
  });

  return {
    ...mutation,
  };
};

export default usePostData;
