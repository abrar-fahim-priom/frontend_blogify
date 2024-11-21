import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";
import { useProfile } from "../Hooks/useProfile";
import { actions } from "../actions";
import search from "../assets/icons/search.svg";
import logo from "../assets/logo.svg";

export default function Header() {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const { state, dispatch } = useProfile();

  // State to hold derived values
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    // Check if auth and auth.user are defined
    const loggedIn = auth && auth.user;
    setIsLoggedIn(loggedIn);

    // Determine the avatar source
    const avatarSource = state?.avatar || auth?.user?.avatar || null;
    setAvatar(avatarSource);

    // Logging for debugging purposes
    console.log("Avatar in state:", state?.avatar);
  }, [auth, state]);

  const handleLogout = () => {
    setAuth({}); // Clear auth state

    dispatch({
      type: actions.profile.LOGOUT_USER_DATA,
    });

    setTimeout(() => {
      navigate("/login");
    }, 0);
  };

  return (
    <header>
      <nav className="container">
        {/* Logo */}
        <div>
          <Link to="/">
            <img className="w-32" src={logo} alt="lws" />
          </Link>
        </div>

        {/* Actions */}
        <div>
          <ul className="flex  items-center space-x-5">
            {isLoggedIn ? (
              <>
                <li>
                  <Link
                    to="/blog-entry"
                    className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                  >
                    Write
                  </Link>
                </li>
                <li>
                  <Link
                    to="/search"
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <img src={search} alt="Search" />
                    <span>Search</span>
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-white/50 hover:text-white transition-all duration-200"
                  >
                    Logout
                  </button>
                </li>
                <li className="flex items-center">
                  <Link className="flex items-center" to="/profile">
                    {avatar ? (
                      <img
                        src={`${
                          import.meta.env.VITE_SERVER_BASE_URL
                        }/uploads/avatar/${avatar}`}
                        alt="User Avatar"
                        className="h-8 w-8 rounded-full"
                      />
                    ) : (
                      <div className="avatar-img bg-orange-600 text-white">
                        <span>{auth?.user?.firstName?.charAt(0)}</span>
                      </div>
                    )}
                    <span className="text-white ml-2">
                      {auth?.user?.firstName}
                    </span>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/register"
                    className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                  >
                    Create
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login"
                    className="text-white/50 hover:text-white transition-all duration-200"
                  >
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}
