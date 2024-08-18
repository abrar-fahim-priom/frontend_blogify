import { useContext } from "react";
import { AuthorContext } from "../Contexts";

export const useAuthor = () => useContext(AuthorContext);
