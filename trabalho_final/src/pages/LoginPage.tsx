import React from "react";
import { loginSchema } from "../schemas/loginSchema";
import FormField from "../components/Atoms/FormField";
import { Link, useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";
import { useAuthContext } from "../hooks/useAuthContext";

const LoginPage = () => {
  const { handleSubmit, register, errors } = useForm(loginSchema);
  const { handleLogin } = useAuthContext();
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit((data) => handleLogin(data, navigate))}
        className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg"
      >
        <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
        <FormField
          label="CPF"
          type="text"
          id="cpf"
          placeholder="000.000.000-00"
          register={register("cpf")}
          mask={{
            mask: "___.___.___-__",
            replacement: {
              _: /[0-9]/,
            },
          }}
          error={errors.cpf?.message}
        />
        <FormField
          label="Senha"
          type="password"
          id="senha_hash"
          placeholder="Digite sua senha"
          register={register("password")}
          error={errors.password?.message}
        />
        <button
          type="submit"
          className="w-full px-4 py-2 mt-4 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none"
        >
          Entrar
        </button>
        <p className="mt-4 text-center text-sm text-gray-600">
          Não tem conta ainda?{" "}
          <Link to="/cadastro" className="text-indigo-600 hover:underline">
            Crie uma aqui
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
