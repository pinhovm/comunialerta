import FamilyCard from "./FamilyCard";
import { useUserContext } from "../../auth/context";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { IFamily } from "../../Interface/IFamily";

export default function FamilyGrid() {
  const user = useUserContext();
  const navigate = useNavigate();
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

  const filteredFamilies = families.filter((family) => {
    if (user.roleFilter === "ACS") {
      return family.area === user.area && family.microarea === user.microArea;
    } else {
      return family.area === user.area;
    }
  });

  const handleAddFamily = () => {
    navigate("/familias/nova", { state: user });
  };

  return (
    <>
      <div className="container mx-auto px-4 py-12">
        {user.roleFilter === "ACS" ||
          ("ADMIN" && (
            <>
              <button
                type="button"
                onClick={handleAddFamily}
                className="rounded-md mx-4 bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Adicionar nova familia
              </button>
            </>
          ))}

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 ">
          {filteredFamilies
            .filter((family) => family.people.length > 0)
            .map((family, index) => {
              return (
                <FamilyCard
                  key={index}
                  headOfFamilyNickname={
                    family.headOfFamilyNickname
                      ? family.headOfFamilyNickname
                      : "" || family.people[0].name
                  }
                  rua={family.rua}
                  numero={family.numero}
                  people={family.people}
                  id={family.id}
                />
              );
            })}
        </div>
      </div>
    </>
  );
}
