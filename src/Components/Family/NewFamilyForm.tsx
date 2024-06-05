import { useNavigate } from "react-router-dom";
import Modal from "../Modal/FamilyMemberModal";
import { SubmitHandler, useForm } from "react-hook-form";
import { IFamily } from "../../Interface/IFamily";
import { IPerson } from "../../Interface/IPerson";
import { useEffect, useState } from "react";
import axios from "axios";

type FormFields = {
  rua: string;
  numero: string;
  hofCellphone: string;
  cep: string;
  hofNickname: string;
  email: string;
};

export default function AddNewFamily() {
  const JSONuser = sessionStorage.getItem("user") || "";
  const user = JSON.parse(JSONuser);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  //define a area, microarea, bairro, cidade e estado atraves do usuario cadastrado
  //uma vez que o ACS precisa estar locado no bairro/cidada/estado de atuacao
  //a area e microarea sao definidas de acordo com o usuario cadastrado
  const [families, setFamilies] = useState<IFamily[]>([]);
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

  const [family, setFamily] = useState<IFamily>({
    id: 0,
    rua: "",
    cep: "",
    numero: "",
    headOfFamilyNickname: "",
    cellphoneHOF: "",
    email: "",
    area: user.area,
    microarea: user.microArea,
    bairro: user.bairro,
    cidade: user.cidade,
    estado: user.estado,
    people: [],
  });

  // adiciona membro familiar atraves do Modal
  const handleModalSave = (newPerson: IPerson) => {
    setFamily((prevFamily: IFamily) => ({
      ...prevFamily,
      people: [...prevFamily.people, newPerson],
    }));
  };

  //React Hook Form
  const { register, handleSubmit, formState } = useForm<FormFields>();

  //adiciona familia
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const response = await axios.post(
        "https://comunialerta.onrender.com/families",
        {
          ...family,
          id: (families.length + 1).toString(),
          rua: data.rua,
          cep: data.cep,
          numero: data.numero,
          headOfFamilyNickname: data.hofNickname || "",
          cellphoneHOF: data.hofCellphone,
          email: data.email,
        }
      );
      if (response.status === 201) {
        navigate(`../../familia/${families.length + 1}`);
      }
    } catch (error) {
      console.error(error);
      setMessage("Erro ao adicionar familia");
    }
  };

  return (
    <div>
      <form className="flex justify-center pt-16 font-bold">
        <div className="">
          <div className="border-b border-gray-900/10 pb-4">
            <h2 className="text-2xl font-semibold leading-7 text-gray-900">
              Adicionar nova família
            </h2>
          </div>

          <div className="border-b border-gray-900/10 pb-4 font-bold">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Informações da Família
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-6">
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
                    required
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
                    required
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
                    required
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
                    required
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
                    required
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

            {/* secao dos membros cadastrados na familia */}
            <div className="justify-start my-2 py-2 font-semibold border-t-2 border-gray-500">
              <p className="my-2">Familiares</p>
              {family.people.map((person, index) => {
                return (
                  <div key={index} className="flex items-center gap-x-4 ">
                    <span className=" font-medium leading-6 text-gray-800">
                      {person.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </form>

      {/* botoes */}
      <div className="flex justify-center">
        <div className="">
          <Modal
            onButtonClick={handleModalSave}
            buttonName={"Adicionar Familiar"}
          />
        </div>
      </div>

      <div className="mt-2  flex justify-center">
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900 p-2 border- border-gray-500 rounded hover:bg-red-500 hover:text-white"
            onClick={() => navigate("/familias")}
          >
            Cancelar
          </button>
          <button
            disabled={
              !formState.isValid ||
              formState.isSubmitting ||
              !family.people.length
            }
            type="button"
            onClick={handleSubmit(onSubmit)}
            className={`rounded-md bg-indigo-600 p-2.5 text-sm font-semibold
              text-white shadow-sm hover:bg-green-600 focus-visible:outline 
              focus-visible:outline-2 focus-visible:outline-offset-2 
              focus-visible:outline-indigo-600 disabled:opacity-50`}
          >
            {formState.isSubmitting ? "Salvando..." : "Salvar"}
          </button>
          {message && <p>{message}</p>}
        </div>
      </div>
    </div>
  );
}
