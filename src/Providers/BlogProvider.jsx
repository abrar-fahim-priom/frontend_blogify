import { useReducer } from "react";
import { BlogContext } from "../Contexts/index.js";
import { blogReducer, initialState } from "../reducers/blogReducer";

export default function BlogProvider({ children }) {
  const [state, dispatch] = useReducer(blogReducer, initialState);

  return (
    <BlogContext.Provider value={{ state, dispatch }}>
      {children}
    </BlogContext.Provider>
  );
}
