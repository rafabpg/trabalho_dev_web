import { useMutation } from "@tanstack/react-query";
import { HttpClient } from "../services/axiosAdapter";
import { queryClient } from "../services/queryCliente";

type UpdateDataProps<T = unknown> = {
  httpClient: HttpClient;
  data: T;
  url: string;
};

const useUpdateData = () => {
  const mutation = useMutation({
    mutationFn: async ({ httpClient, data, url }: UpdateDataProps) => {
      const response = await httpClient.request({
        url: url,
        method: "put",
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

export default useUpdateData;
