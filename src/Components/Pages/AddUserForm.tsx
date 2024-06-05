import React, { useEffect, useState } from "react";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { IUser } from "../../Interface/IUser";
import { useNavigate } from "react-router-dom";

type FormFields = {
  login: string;
  password: string;
  nome: string;
  sobrenome: string;
  roleFilter: "ACS | SECRETARIO";
  area: number;
  microarea: number;
  email: string;
  celphoneNumber: string;
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
};

const AddUserForm: React.FC = () => {
  const [message, setMessage] = useState("");
  const { register, handleSubmit } = useForm<FormFields>();
  const [users, setUsers] = useState<IUser[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("https://comunialerta.onrender.com/families")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const userAlreadyExists = (login: string): boolean => {
    if (users.find((user) => user.login === login)) {
      return true;
    }
    return false;
  };

  //alteracao teste
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    if (userAlreadyExists(data.login)) {
      alert("Usuário já cadastrado");
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
    try {
      const response = await axios.post(
        "https://comunialerta.onrender.com/users",
        {
          login: data.login,
          password: data.password,
          nome: data.nome,
          sobrenome: data.sobrenome,
          email: data.email,
          area: data.area,
          microArea: data.microarea,
          rua: data.rua,
          bairro: data.bairro,
          cidade: data.cidade,
          estado: data.estado,
          cep: data.cep,
          roleFilter: "ACS",
        }
      );
      if (response.status === 201) {
        navigate(`../../familias`);
      }
    } catch (error) {
      console.error(error);
      setMessage("Erro ao adicionar o usuário.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center pt-16"
    >
      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-2xl font-semibold leading-7 text-gray-900 border-b border-gray-900/10 pb-2">
          Cadastro de ACS
        </h2>
        <h2 className=" text-base font-semibold leading-7 text-gray-900">
          Informacoes Pessoais
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label
              htmlFor="nome"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Nome
            </label>
            <div className="mt-2">
              <input
                {...register("nome")}
                type="text"
                name="nome"
                id="nome"
                className="block w-full rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="sobrenome"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Sobrenome
            </label>
            <div className="mt-2">
              <input
                {...register("sobrenome")}
                type="text"
                name="sobrenome"
                id="sobrenome"
                autoComplete="family-name"
                className="block w-full rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-4">
            <label
              htmlFor="email"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Email
            </label>
            <div className="mt-2">
              <input
                {...register("email")}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="block w-full rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="rua"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Rua
            </label>
            <div className="mt-2">
              <input
                {...register("rua")}
                type="text"
                name="rua"
                id="rua"
                autoComplete="street-address"
                className="block w-full rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2 sm:col-start-1">
            <label
              htmlFor="bairro"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Bairro
            </label>
            <div className="mt-2">
              <input
                {...register("bairro")}
                type="text"
                name="bairro"
                id="bairro"
                className="block w-full rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="cidade"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Cidade
            </label>
            <div className="mt-2">
              <input
                {...register("cidade")}
                type="text"
                name="cidade"
                id="cidade"
                className="block w-full rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="cep"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              CEP
            </label>
            <div className="mt-2">
              <input
                {...register("cep")}
                type="text"
                name="cep"
                id="cep"
                className="block w-full rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Dados do Usuario
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label
              htmlFor="login"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              CPF
            </label>
            <div className="mt-2">
              <input
                {...register("login")}
                type="text"
                name="login"
                id="login"
                className="block w-full rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="password"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Senha
            </label>
            <div className="mt-2">
              <input
                {...register("password")}
                type="password"
                name="password"
                id="password"
                autoComplete="family-name"
                placeholder="Senha Inicial"
                className="block w-full rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2 sm:col-start-1">
            <label
              htmlFor="area"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Area
            </label>
            <div className="mt-2">
              <input
                {...register("area")}
                type="number"
                min={0}
                name="area"
                id="area"
                className="block w-full rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="microArea"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Micro Area
            </label>
            <div className="mt-2">
              <input
                {...register("microarea")}
                type="number"
                min={0}
                name="microArea"
                id="microArea"
                className="block w-full rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="roleFilter"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Funcao
            </label>
            <div className="mt-2">
              <select
                {...register("roleFilter")}
                name="roleFilter"
                id="roleFilter"
                className="block w-full rounded-md border-0 p-1.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                <option value="ACS">Agente de Saude</option>
                <option value="SECRETARIO">Secretario</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex justify-end pt-12">
          <button
            onClick={() => navigate(`../../familias`)}
            className="bg-red-400 text-white mt-4 py-2 px-4 rounded justify-end mr-4"
          >
            Voltar
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white mt-4 py-2 px-4 rounded justify-end"
          >
            Adicionar Usuário
          </button>
          {message && <p className="mt-4 text-red-500">{message}</p>}
        </div>
      </div>
    </form>
  );
};

export default AddUserForm;
