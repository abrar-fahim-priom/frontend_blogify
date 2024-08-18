import { useContext } from "react";
import { BlogContext } from "../Contexts";

export const useBlog = () => {
  return useContext(BlogContext);
};
