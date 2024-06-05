import { IFamily } from "../../Interface/IFamily";

interface FamilyCardProps {
  id: IFamily["id"];
  headOfFamilyNickname: IFamily["headOfFamilyNickname"];
  rua: IFamily["rua"];
  numero: IFamily["numero"];
  people: IFamily["people"];
}

export default function FamilyCard({
  headOfFamilyNickname,
  rua,
  people,
  numero,
  id,
}: FamilyCardProps) {
  return (
    <a href={`/familia/${id}`}>
      <div className="container mx-auto px-4 py-8">
        <div>
          <div className="bg-white p-4 rounded shadow cursor-pointer relative">
            <h2 className="text-xl font-semibold mb-2">{`Familia`}</h2>
            <h2 className="text-xl font-semibold mb-2">{`${headOfFamilyNickname}`}</h2>
            <span className="">
              <i className="absolute top-8 right-4 fa-solid fa-house-chimney-window fa-xl"></i>
            </span>
            <p className="mb-2">
              <strong>Chefe de familia:</strong> {headOfFamilyNickname}
            </p>
            <p className="mb-2">
              <strong>Endereço:</strong> Rua: {rua}, {numero}
            </p>
            <p className="mb-2">
              <strong>Numero de familiares:</strong> {people.length}
            </p>
          </div>
        </div>
      </div>
    </a>
  );
}
