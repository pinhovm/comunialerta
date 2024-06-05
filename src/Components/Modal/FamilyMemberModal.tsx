import React, { useEffect } from "react";
import { IPerson } from "../../Interface/IPerson";
import { SubmitHandler, useForm } from "react-hook-form";

interface ModalProps {
  // eslint-disable-next-line no-unused-vars
  onButtonClick: (newPerson: IPerson) => void;
  buttonName?: string;
  initialData?: IPerson; // Add initialData prop
}

type FormFields = {
  name: string;
  cpf: string;
  cns: string;
  identity?: string;
  sex: "M" | "F";
  age: string;
  diabetes: boolean;
  hypertension: boolean;
  heartProblem: boolean;
  isGestante: boolean;
};

export default function Modal({
  onButtonClick,
  buttonName,
  initialData,
}: ModalProps) {
  const generateRandomId = (): string => {
    return "_" + Math.random().toString(36).substr(2, 9);
  };

  const [showModal, setShowModal] = React.useState(false);
  const { register, handleSubmit, reset, setValue } = useForm<FormFields>();

  // Use useEffect to prefill the form with initialData when the modal is opened
  useEffect(() => {
    if (initialData) {
      setValue("name", initialData.name);
      setValue("cpf", initialData.cpf);
      setValue("cns", initialData.cns);
      setValue("identity", initialData.identity || "");
      setValue("age", initialData.age);
      setValue("sex", initialData.sex);
      setValue("diabetes", initialData.diabetes);
      setValue("hypertension", initialData.hypertension);
      setValue("heartProblem", initialData.heartProblem);
      setValue("isGestante", initialData.isGestante);
    }
  }, [initialData, setValue]);

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const newPerson: IPerson = {
      id: initialData ? initialData.id : generateRandomId(),
      name: data.name,
      cpf: data.cpf,
      age: data.age,
      cns: data.cns,
      sex: data.sex,
      diabetes: data.diabetes,
      hypertension: data.hypertension,
      heartProblem: data.heartProblem,
      isGestante: data.isGestante,
    };
    await new Promise((resolve) => setTimeout(resolve, 500));
    onButtonClick(newPerson);
    setShowModal(false);
    reset();
  };

  return (
    <div>
      <button
        className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm
         hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
         focus-visible:outline-indigo-600 mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        {buttonName}
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none leading-6">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold mr-8">
                    Cadastro Individual
                  </h3>
                  <button
                    className="ml-auto mr-0 rounded-md bg-red-400 p-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Fechar
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <div className="my-4 text-md leading-">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="mb-4">
                        <label
                          htmlFor="name"
                          className="block text-gray-700 text-sm font-bold mb-2"
                        >
                          Nome
                        </label>
                        <input
                          {...register("name")}
                          type="text"
                          id="name"
                          required
                          className="shadow appearance-none border rounded w-full p-2 placeholder:text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="Nome"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="cpf"
                          className="block text-gray-700 text-sm font-bold mb-2"
                        >
                          CPF
                        </label>
                        <input
                          {...register("cpf")}
                          type="text"
                          id="cpf"
                          min={11}
                          max={11}
                          className="shadow appearance-none border rounded w-full p-2 placeholder:text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="CPF"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="CNS"
                          className="block text-gray-700 text-sm font-bold mb-2"
                        >
                          CNS
                        </label>
                        <input
                          {...register("cns")}
                          type="text"
                          id="CNS"
                          required
                          min={15}
                          max={15}
                          className="shadow appearance-none border rounded w-full p-2 placeholder:text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="Cartao SUS"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="identity"
                          className="block text-gray-700 text-sm font-bold mb-2"
                        >
                          Identidade:
                        </label>
                        <input
                          {...register("identity")}
                          type="text"
                          id="identity"
                          className="shadow appearance-none border rounded w-full p-2 placeholder:text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="Opcional, RG"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="birthDate"
                          className="block text-gray-700 text-sm font-bold mb-2"
                        >
                          Data de Nascimento
                        </label>
                        <input
                          {...register("age")}
                          type="date"
                          id="birthDate"
                          className="shadow appearance-none border rounded w-full p-2 text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="Idade"
                          required
                        />
                      </div>

                      <div className="mb-4">
                        <label htmlFor="sexo">Sexo</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-center ">
                            <input
                              required
                              className="mr-2 leading-tight"
                              {...register("sex")}
                              value="M"
                              type="radio"
                            />
                            {"Masculino"}
                            <input
                              className="mr-2 leading-tight ml-2"
                              {...register("sex")}
                              value="F"
                              type="radio"
                            />
                            {"Feminino"}
                          </div>
                        </div>
                      </div>

                      {/* Condicao de Saude */}

                      <div className="mb-4">
                        <label
                          htmlFor="healthProblems"
                          className="block text-gray-700 text-sm font-bold mb-2"
                        >
                          Problemas de Saude
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-center">
                            <input
                              {...register("diabetes")}
                              type="checkbox"
                              id="diabetes"
                              className="mr-2 leading-tight"
                            />
                            <span className="text-gray-700 text-sm">
                              Diabetes
                            </span>
                          </div>
                          <div className="flex items-center">
                            <input
                              {...register("hypertension")}
                              type="checkbox"
                              id="hypertension"
                              className="mr-2 leading-tight"
                            />
                            <span className="text-gray-700 text-sm">
                              Hipertensao
                            </span>
                          </div>
                          <div className="flex items-center">
                            <input
                              {...register("heartProblem")}
                              type="checkbox"
                              id="heartProblem"
                              className="mr-2 leading-tight"
                            />
                            <span className="text-gray-700 text-sm">
                              Problema Cardíaco
                            </span>
                          </div>
                          <div className="flex items-center">
                            <input
                              {...register("isGestante")}
                              type="checkbox"
                              id="isGestante"
                              className="mr-2 leading-tight"
                            />
                            <span className="text-gray-700 text-sm">
                              Gestante
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                        <button
                          className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mr-1 mb-1 ease-linear transition-all duration-150"
                          type="submit"
                        >
                          Salvar
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
