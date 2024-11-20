import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as useReactForm } from "react-hook-form";
import { z, ZodType, ZodTypeDef } from "zod";

const useForm = <TSchema extends ZodType<any, ZodTypeDef>>(schema: TSchema) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useReactForm<z.infer<TSchema>>({
    resolver: zodResolver(schema),
  });

  return {
    errors,
    register,
    handleSubmit,
  };
};

export default useForm;
