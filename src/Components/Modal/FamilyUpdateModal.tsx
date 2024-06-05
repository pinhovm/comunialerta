import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IFamily } from "../../Interface/IFamily";

interface ModalProps {
  onButtonClick: (updatedFamily: IFamily) => void;
  initialData: IFamily; // Add initialData prop
}
type FormFields = {
  rua: string;
  numero: string;
  hofCellphone: string;
  cep: string;
  hofNickname: string;
  email: string;
};

export default function UpdateFamilyModal({
  onButtonClick,
  initialData,
}: ModalProps) {
  const [showModal, setShowModal] = React.useState(false);
  const { register, handleSubmit, reset, setValue } = useForm<FormFields>();

  useEffect(() => {
    if (initialData) {
      setValue("rua", initialData.rua);
      setValue("numero", initialData.numero);
      setValue("cep", initialData.cep);
      setValue("email", initialData.email);
      setValue("hofCellphone", initialData.cellphoneHOF);
      setValue("hofNickname", initialData.headOfFamilyNickname);
    }
  }, [initialData, setValue]);

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const updatedFamily: IFamily = {
      ...initialData,
      rua: data.rua,
      numero: data.numero,
      cep: data.cep,
      email: data.email,
      cellphoneHOF: data.hofCellphone,
      headOfFamilyNickname: data.hofNickname,
    };
    await new Promise((resolve) => setTimeout(resolve, 500));
    onButtonClick(updatedFamily);
    setShowModal(false);
    reset();
  };

  return (
    <div>
      <button
        className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm
         hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
         focus-visible:outline-green-600 mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Editar Familia
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none leading-6">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-100 outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <button
                    className="ml-auto mr-0 rounded-md bg-red-400 p-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Fechar
                  </button>
                </div>
                <div className="relative px-6 flex-auto">
                  <div className="my-4 text-md leading-">
                    <form className="flex justify-center font-bold">
                      <div className="">
                        <div className="border-b border-gray-900/10 pb-4">
                          <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                            Atualizar Familia
                          </h2>
                        </div>

                        <div className="border-b border-gray-900/10 pb-4 font-bold">
                          <h2 className="text-base font-semibold leading-7 text-gray-900">
                            Informações da Família
                          </h2>

                          <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-6">
                            <div className="sm:col-span-full">
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
                                  className="block w-full rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-3">
                              <label
                                htmlFor="numero"
                                className="block text-sm font-semibold leading-6 text-gray-900"
                              >
                                Numero
                              </label>
                              <div className="mt-2">
                                <input
                                  {...register("numero")}
                                  type="text"
                                  name="numero"
                                  id="numero"
                                  className="block w-full rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-3">
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

                            <div className="sm:col-span-full">
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

                            <div className="sm:col-span-3">
                              <label
                                htmlFor="cellphone"
                                className="block text-sm font-semibold leading-6 text-gray-900 mt-2"
                              >
                                Whatsapp do Chefe de Familia
                              </label>

                              <div className="mt-2">
                                <input
                                  {...register("hofCellphone")}
                                  id="hofCellphone"
                                  name="hofCellphone"
                                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 font-medium shadow-sm ring-1 ring-inset sm:max-w-xs sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>
                            <div className="sm:col-span-3">
                              <label
                                htmlFor="hofNickname"
                                className="block text-sm font-semibold leading-6 text-gray-900 mt-2"
                              >
                                Nome Social do Chefe de Familia
                              </label>

                              <div className="mt-2">
                                <input
                                  {...register("hofNickname")}
                                  type="text"
                                  name="hofNickname"
                                  id="hofNickname"
                                  placeholder="Opcional, apelido"
                                  className="block w-full rounded-md border-0 p-1 text-gray-900 shadow-sm sm:text-sm sm:leading-6 placeholder:font-medium"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                      <button
                        onClick={handleSubmit(onSubmit)}
                        className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mr-1 mb-1 ease-linear transition-all duration-150"
                        type="submit"
                      >
                        Salvar
                      </button>
                    </div>
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
