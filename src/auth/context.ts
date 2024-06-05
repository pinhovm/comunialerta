import { createContext, useContext } from "react";
import { IUser } from "../Interface/IUser";

export const UserContext = createContext<IUser | null>(null);

export function useUserContext() {
  const userContext = useContext(UserContext);
  if (userContext === null) {
    throw new Error("useUserContext must be used within an UserProvider");
  }
  return userContext;
}
