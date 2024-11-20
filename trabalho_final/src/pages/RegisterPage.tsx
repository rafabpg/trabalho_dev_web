import React from "react";
import FormField from "../components/Atoms/FormField";
import { cadastroSchema } from "../schemas/registerSchema";
import { Link, useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";
import { useAuthContext } from "../hooks/useAuthContext";

const RegisterPage = () => {
  const { handleSubmit, register, errors } = useForm(cadastroSchema);
  const { handleRegister } = useAuthContext();
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h1 className="text-2xl font-bold text-center mb-6">Cadastro</h1>
      <form onSubmit={handleSubmit((data) => handleRegister(data, navigate))}>
        <FormField
          label="Nome"
          type="text"
          id="nome"
          placeholder="Digite seu nome"
          register={register("nome")}
          error={errors.nome?.message}
        />
        <FormField
          label="E-mail"
          type="email"
          id="email"
          placeholder="Digite seu e-mail"
          register={register("email")}
          error={errors.email?.message}
        />
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
          label="Telefone"
          type="text"
          id="telefone"
          placeholder="(00) 00000-0000"
          register={register("telefone")}
          mask={{
            mask: "(__) _____-____",
            replacement: {
              _: /[0-9]/,
            },
          }}
          error={errors.telefone?.message}
        />
        <FormField
          label="Senha"
          type="password"
          id="senha_hash"
          placeholder="Digite sua senha"
          register={register("senha_hash")}
          error={errors.senha_hash?.message}
        />
        <p className="m-4 text-center text-sm text-gray-600">
          Já tem conta ?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Faça seu Login
          </Link>
        </p>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded hover:bg-indigo-700 focus:outline-none"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
