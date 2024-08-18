import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";

export default function PrivateRoutes() {
  const { auth } = useAuth();
  console.log(auth);
  return (
    <>
      {auth.authToken ? (
        <>
          <div className="bg-[#030317] text-white">
            <Outlet />
          </div>
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}
