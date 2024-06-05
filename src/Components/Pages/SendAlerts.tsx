import axios from "axios";
import { useState, useEffect } from "react";
import { IFamily } from "../../Interface/IFamily";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormFields {
  maxAge: number;
  minAge: number;
  sex: "M" | "F";
  area: number;
  microarea: number;
  diabetes: boolean;
  hypertension: boolean;
  heartProblem: boolean;
  isGestante: boolean;
}

export default function SendAlerts() {
  const { register, handleSubmit } = useForm<FormFields>();
  const [families, setFamilies] = useState<IFamily[]>([]);
  const getAge = (birthDate: string): number => {
    const birthDateObj = new Date(birthDate);
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const birthYear = birthDateObj.getFullYear();

    let age = currentYear - birthYear;

    // If the birthday hasn't occurred yet this year, subtract one from age
    if (
      currentDate.getMonth() < birthDateObj.getMonth() ||
      (currentDate.getMonth() === birthDateObj.getMonth() &&
        currentDate.getDate() < birthDateObj.getDate())
    ) {
      age -= 1;
    }

    return age;
  };

  useEffect(() => {
    axios
      .get("https://comunialerta.onrender.com/families")
      .then((res) => {
        setFamilies(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    const filteredFamilies = families.filter((family) => {
      return family.people.some(
        (person) =>
          getAge(person.age) >= data.minAge &&
          getAge(person.age) <= data.maxAge &&
          person.sex === data.sex &&
          family.area === data.area &&
          family.microarea === data.microarea
      );
    });
    console.log(filteredFamilies);
  };

  return (
    <div className="container mx-auto px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center pt-8 sm:pt-16"
      >
        <div className="w-full max-w-4xl border-b border-gray-900/10 pb-8 sm:pb-12">
          <h2 className="text-2xl font-semibold leading-7 text-gray-900 border-b border-gray-900/10 pb-2">
            Emissao de Alertas
          </h2>
          <h2 className="text-base font-semibold leading-7 text-gray-600">
            Filtros
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="minAge"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Idade Mínima
              </label>
              <div className="mt-2">
                <input
                  {...register("minAge")}
                  type="number"
                  min={0}
                  max={100}
                  name="minAge"
                  id="minAge"
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="maxAge"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Idade Maxima
              </label>
              <div className="mt-2">
                <input
                  {...register("maxAge")}
                  type="number"
                  name="maxAge"
                  id="maxAge"
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="healthProblems" className="font-semibold">
                Problemas de Saude
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="m-2"
                    {...register("diabetes")}
                  />{" "}
                  Diabetes
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="m-2"
                    {...register("hypertension")}
                  />{" "}
                  Hipertensao
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="m-2"
                    {...register("heartProblem")}
                  />{" "}
                  Problema Cardiaco
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="m-2"
                    {...register("isGestante")}
                  />{" "}
                  Gestante
                </div>
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="sexo" className="font-semibold">
                Sexo
              </label>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="flex items-center ">
                  <input
                    className="mr-2 leading-tight"
                    {...register("sex")}
                    value="M"
                    type="radio"
                  />
                  {"Masculino"}
                </div>
                <div className="flex items-center">
                  <input
                    className="mr-2 leading-tight"
                    {...register("sex")}
                    value="F"
                    type="radio"
                  />
                  {"Feminino"}
                </div>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="area"
                className="block text-sm font-semibold leading-6 text-gray-900 mt-4"
              >
                Area
              </label>
              <div className="mt-2">
                <input
                  {...register("area")}
                  type="number"
                  min={0}
                  name="area"
                  required
                  id="area"
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="microarea"
                className="block text-sm font-semibold leading-6 text-gray-900 mt-4"
              >
                Micro Area
              </label>
              <div className="mt-2">
                <input
                  {...register("microarea")}
                  type="number"
                  min={0}
                  name="microarea"
                  required
                  id="microarea"
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="messageContent"
                className="block text-sm leading-6 text-gray-900 font-semibold mt-8"
              >
                Mensagem
              </label>
              <div className="mt-2">
                <textarea
                  id="messageContent"
                  required
                  name="messageContent"
                  rows={3}
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Ex.: Ola, o posto de Saude já se encontra com vacinas para ...... disponiveis"
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Escreva detalhes sobre o alerta a ser enviado.
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-end w-full max-w-4xl pt-8 sm:pt-12">
          <button
            type="submit"
            className="rounded-md bg-green-600 px-4 py-2 text-sm font-semibold mb-16 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            Enviar Alertas
          </button>
        </div>
      </form>
    </div>
  );
}
