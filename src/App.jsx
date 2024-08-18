import { Route, Routes } from "react-router-dom";
import BlogEntry from "./Components/Blogs/BlogEntry";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import NotFoundPage from "./Pages/NotFoundPage";
import ProfilePage from "./Pages/ProfilePage";
import RegistrationPage from "./Pages/RegistrationPage";
import SingleBlogPage from "./Pages/SingleBlogPage";
import PrivateRoutes from "./Routes/PrivateRoutes";
export default function App() {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route element={<ProfilePage />} path="/profile" />
          <Route element={<BlogEntry />} path="/blog-entry" />
        </Route>
        <Route element={<HomePage />} path="/" />
        <Route element={<SingleBlogPage />} path="/single-blog/:blogId" />
        <Route element={<LoginPage />} path="/login" exact />
        <Route element={<RegistrationPage />} path="/register" />
        <Route element={<NotFoundPage />} path="/*" />
      </Routes>
    </>
  );
}
