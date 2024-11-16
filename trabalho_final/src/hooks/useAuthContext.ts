import { NavigateFunction } from "react-router-dom"
import { CadastroSchemaType } from "../schemas/registerSchema"
import { LoginSchemaType } from "../schemas/loginSchema"
import { useEffect, useState } from "react"
import { UserProps } from "../shared/UserInterface"


export function userAuthContext() {
    const [user, setUser] = useState<UserProps>({} as UserProps)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const authenticated = await handleVerifyToken()
      setIsAuthenticated(authenticated)
      setIsLoading(false)
    }

    fetchData()
  }, [])

  const handleLogin =async (body: LoginSchemaType, navigate: NavigateFunction) => {

  }

  const handleLogout = async (navigate: NavigateFunction) => {

  }

  const handleRegister = async (
    body: CadastroSchemaType,
    navigate: NavigateFunction
  ) => {

  }


  const handleVerifyToken = async () => {
    return true;
  }

  return {
    user,
    setUser,
    handleLogin,
    handleRegister,
    isAuthenticated,
    isLoading,
    handleLogout,
  }
}