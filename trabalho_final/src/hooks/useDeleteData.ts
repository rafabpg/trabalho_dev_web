import { useMutation } from "@tanstack/react-query";
import { HttpClient } from "../services/axiosAdapter";
import { queryClient } from "../services/queryCliente";

type DeleteDataProps = {
  httpClient: HttpClient;
  url: string;
};

const useDeleteData = () => {
  const mutation = useMutation({
    mutationFn: async ({ httpClient, url }: DeleteDataProps) => {
      const response = await httpClient.request({
        url: url,
        method: "delete",
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

export default useDeleteData;
