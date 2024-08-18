import { useContext } from "react";
import { AuthContext } from "../Contexts";

export const useAuth = () => {
  return useContext(AuthContext);
};
