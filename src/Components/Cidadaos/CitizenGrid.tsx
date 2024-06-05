import CitizenCard from "./CitizenCard";
import axios from "axios";
import { useState, useEffect } from "react";
import { IFamily } from "../../Interface/IFamily";
import Modal from "../Modal/FamilyMemberModal";
import { IPerson } from "../../Interface/IPerson";
import { useNavigate, useParams } from "react-router-dom";
import UpdateFamilyModal from "../Modal/FamilyUpdateModal";

export default function CitizenGrid() {
  const { id } = useParams<{ id: string }>(); // recebe o ID da familia atraves da URL com o useParams
  const [error, setError] = useState<string | null>(null);
  const [family, setFamily] = useState<IFamily | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`https://comunialerta.onrender.com/families/${id}`)
      .then((res) => {
        setFamily(res.data);
      })
      .catch((err) => {
        console.error(err);
        setError("Falha ao carregar a familia");
      });
  }, [id]);
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-5xl text-red-500">{error}</h1>
      </div>
    );
  }
  if (!id) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-5xl">Familia não encontrada</h1>
      </div>
    );
  }
  const getAge = (birthDate: string): number => {
    const birthDateObj = new Date(birthDate);
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const birthYear = birthDateObj.getFullYear();
    let age = currentYear - birthYear;
    if (
      currentDate.getMonth() < birthDateObj.getMonth() ||
      (currentDate.getMonth() === birthDateObj.getMonth() &&
        currentDate.getDate() < birthDateObj.getDate())
    ) {
      age -= 1;
    }

    return age;
  };

  if (!family) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-5xl flex justify-center">Familia não encontrada</h1>
      </div>
    );
  }

  // adiciona membro familiar atraves do Modal
  const handleModalSave = async (newPerson: IPerson) => {
    try {
      const existingPerson = family.people.find(
        (person) => person.id === newPerson.id
      );
      if (existingPerson) {
        throw new Error("Person with the same ID already exists in the family");
      }
      const updatedFamily = {
        ...family,
        people: [...family.people, newPerson],
      };
      await axios.put(
        `https://comunialerta.onrender.com/families/${id}`,
        updatedFamily
      );
      setFamily(updatedFamily);
    } catch (error) {
      console.error("Error updating family:", error);
      setError("Falha ao adicionar membro da família");
    }
  };

  const handleModalUpdate = async (updatedFamily: IFamily) => {
    setFamily(updatedFamily);
    await axios.put(
      `https://comunialerta.onrender.com/families/${id}`,
      updatedFamily
    );
  };

  const handleModalEdit = async (updatedPerson: IPerson) => {
    try {
      const updatedFamily = {
        ...family,
        people: family.people.map((person) =>
          person.id === updatedPerson.id ? updatedPerson : person
        ),
      };

      setFamily(updatedFamily);
    } catch (error) {
      console.error("Error updating family member:", error);
      setError("Falha ao editar membro da família");
    }
  };

  const handleDeleteClick = async (deleteId: string) => {
    try {
      const updatedFamily = {
        ...family,
        people: family.people.filter((person) => person.id !== deleteId),
      };
      await axios.put(`https://comunialerta.onrender.com/${id}`, updatedFamily);
      setFamily(updatedFamily);
    } catch (error) {
      console.error("Error updating family member:", error);
      setError("Falha ao editar membro da família");
    }
  };
  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {family.people.map((citizen, index) => (
            <CitizenCard
              key={index}
              name={citizen.name}
              id={citizen.id}
              age={getAge(citizen.age).toString()}
              onButtonClick={handleDeleteClick}
            >
              <Modal
                onButtonClick={handleModalEdit}
                buttonName="Editar"
                initialData={citizen}
              />
            </CitizenCard>
          ))}
        </div>
      </div>
      <div className="container mx-auto px-8 py-8 ">
        <div className="flex justify-start">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900 p-2 border bg-gray-50 border-gray-500 rounded hover:bg-red-500 hover:text-white"
            onClick={() => navigate("/familias")}
          >
            Voltar
          </button>
        </div>
        <div className="flex justify-end py-2">
          <Modal
            onButtonClick={handleModalSave}
            buttonName="Adicionar Familiar"
          />
          <UpdateFamilyModal
            onButtonClick={handleModalUpdate}
            initialData={family}
          />
        </div>
      </div>
    </div>
  );
}
