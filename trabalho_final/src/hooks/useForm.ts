import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as useReactForm} from "react-hook-form";
import { z, ZodType, ZodTypeDef } from "zod";
import usePostData from "./usePostData";
import { AxiosHttpClientAdapter } from "../services/axiosAdapter";

const useForm = <TSchema extends ZodType<any, ZodTypeDef>>(schema: TSchema) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useReactForm<z.infer<TSchema>>({
        resolver: zodResolver(schema),
      });
      const {mutate,data,isLoading} = usePostData()

      const handleSubmitForm = async (postData:z.infer<TSchema>,url:string ) => {
        console.log("data",postData);
        console.log("data",url);
        mutate({httpClient:new AxiosHttpClientAdapter(),data:postData,url:url})
      };

      return{
        errors,
        register,
        handleSubmit,
        handleSubmitForm
      }
}

export default useForm