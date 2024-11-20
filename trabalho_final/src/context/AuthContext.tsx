import { createContext } from "react";
import { LoginSchemaType } from "../schemas/loginSchema";
import { NavigateFunction } from "react-router-dom";
import { CadastroSchemaType } from "../schemas/registerSchema";
import { UserProps } from "../shared/UserInterface";
import { useAuthContext } from "../hooks/useAuthContext";

interface AuthContextData {
    user: UserProps
    isAuthenticated: boolean
    isLoading: boolean
    handleLogin(body: LoginSchemaType, navigate: NavigateFunction): Promise<void>
    handleRegister(
      body: CadastroSchemaType,
      navigate: NavigateFunction
    ): Promise<void>
    handleLogout(navigate: NavigateFunction): void
  }

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)


export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => {
    const {
      user,
      handleLogin,
      handleRegister,
      isAuthenticated,
      isLoading,
      handleLogout,
    } = useAuthContext()
  
    return (
      <AuthContext.Provider
        value={{
          isAuthenticated,
          user,
          handleLogin,
          handleRegister,
          isLoading,
          handleLogout,
        }}
      >
        {children}
      </AuthContext.Provider>
    )
  }