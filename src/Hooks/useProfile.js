import { useContext } from "react";
import { ProfileContext } from "../Contexts/index.js";

export const useProfile = () => {
  return useContext(ProfileContext);
};
