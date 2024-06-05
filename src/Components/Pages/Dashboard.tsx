import FamilyGrid from "../Family/FamilyGrid";
import Navbar from "./Header";
import { UserContext } from "../../auth/context";

export default function Dashboard() {
  const user = sessionStorage.getItem("user") || "";
  const parsedUser = JSON.parse(user);

  return (
    <div>
      <UserContext.Provider value={parsedUser}>
        <Navbar />
        <FamilyGrid />
      </UserContext.Provider>
    </div>
  );
}
