import { NavigateFunction } from "react-router-dom";
import { CadastroSchemaType } from "../schemas/registerSchema";
import { LoginSchemaType } from "../schemas/loginSchema";
import { useEffect, useState } from "react";
import { UserProps } from "../shared/UserInterface";
import usePostData from "./usePostData";
import { AxiosHttpClientAdapter } from "../services/axiosAdapter";
import useGetData from "./useGetData";

export function useAuthContext() {
  const [user, setUser] = useState<UserProps>({} as UserProps);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const { mutateAsync, isLoading } = usePostData();
  const { data,isLoading: isLoadingData,  error } = useGetData({
    httpClient: new AxiosHttpClientAdapter(),
    url: "/user",
  });

  useEffect(() => {
    console.log("isLoadingData",isLoadingData)
    if (error) {
      setIsAuthenticated(false);
      setUser({} as UserProps); 
    }else if(data?.data ){
      console.log("data",data)
      setIsAuthenticated(true);
      setUser(data?.data);
    }
  }, [data]);

  const handleLogin = async (
    body: LoginSchemaType,
    navigate: NavigateFunction
  ) => {
    const response = await mutateAsync({
      httpClient: new AxiosHttpClientAdapter(),
      data: body,
      url: "/auth/login",
    });
    if (response.status === 200) {
      localStorage.setItem("token", response.data.token);
      setIsAuthenticated(true);
      navigate("/");
    }
  };

  const handleLogout =  () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser({} as UserProps);
  };

  const handleRegister = async (
    body: CadastroSchemaType,
    navigate: NavigateFunction
  ) => {
    const response = await mutateAsync({
      httpClient: new AxiosHttpClientAdapter(),
      data: body,
      url: "/user",
    });
    if (response.status === 201) {
      navigate("/login");
    }
  };

  return {
    user,
    setUser,
    handleLogin,
    handleRegister,
    isAuthenticated,
    isLoading:isLoadingData || isLoading,
    handleLogout,
  };
}
