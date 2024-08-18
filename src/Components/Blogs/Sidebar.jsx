import { useAuth } from "../../Hooks/useAuth";
import MostPopular from "./MostPopular";
import YourFavourites from "./YourFavourites";

export default function Sidebar() {
  const { auth, setAuth } = useAuth();
  const isLoggedIn = auth && auth.user;

  return (
    <div className="md:col-span-2 h-full w-full space-y-5">
      <MostPopular />
      {isLoggedIn && <YourFavourites />}
    </div>
  );
}
