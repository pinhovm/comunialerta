import { IPerson } from "../../Interface/IPerson";

interface CitizenCardProps {
  id: IPerson["id"];
  name: IPerson["name"];
  age: IPerson["age"];
  children: React.ReactNode;
  // eslint-disable-next-line no-unused-vars
  onButtonClick: (id: string) => void;
}

export default function CitizenCard({
  id,
  name,
  age,
  children,
  onButtonClick,
}: CitizenCardProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div>
        <div className="bg-white p-4 rounded shadow cursor-pointer relative">
          <h2 className="text-xl font-semibold mb-2">{name}</h2>
          <p className="mb-2">
            <strong>{age} anos</strong>
          </p>

          <div className="flex justify-end">
            {children}
            <button
              onClick={() => {
                onButtonClick(id);
              }}
              className="border-gray-300 border rounded-md bg-gray-150 p-2 text-sm font-semibold
              text-black hover:bg-red-500 hover:text-white mr-1 mb-1 ease-linear transition-all duration-150"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
