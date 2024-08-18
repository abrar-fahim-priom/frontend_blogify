import { useState } from "react";
import { AuthorContext } from "../Contexts";

export const AuthorProvider = ({ children }) => {
  const [authorId, setAuthorId] = useState(null);

  return (
    <AuthorContext.Provider value={{ authorId, setAuthorId }}>
      {children}
    </AuthorContext.Provider>
  );
};
