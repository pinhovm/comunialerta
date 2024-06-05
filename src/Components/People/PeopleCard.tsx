import { IPerson } from "../../Interface/IPerson";

interface PeopleCardProps {
  id: IPerson["id"];
  name: IPerson["name"];
  age: IPerson["age"];
}
export default function PeopleCard({ id, name, age }: PeopleCardProps) {
  return (
    <div className="people-card">
      <h1>{id}</h1>
      <h2>{name}</h2>
      <p>{age} anos</p>
    </div>
  );
}
