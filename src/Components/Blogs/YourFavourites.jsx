import { useEffect } from "react";
import { actions } from "../../actions/index.js";
import useAxios from "../../Hooks/useAxios.js";
// import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useBlog } from "../../Hooks/useBlog";

export default function YourFavourites() {
  const { state, dispatch } = useBlog();
  const { api } = useAxios();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({
      type: actions.blog.DATA_FETCHING,
    });
    const fetchMostPopular = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/favourites`
        );

        if (response.status === 200) {
          dispatch({
            type: actions.blog.FAVOURITES_FETCHED,
            data: response.data.blogs,
          });

          console.log(state.favourites);
        }
      } catch (error) {
        console.log(error);
        dispatch({
          type: actions.blog.DATA_FETCH_ERROR,
          error: err.message,
        });
      }
    };

    fetchMostPopular();
  }, []);
  return (
    <>
      <div className="sidebar-card">
        <h3 className="text-slate-300 text-xl lg:text-2xl font-semibold">
          Your Favourites ❤️
        </h3>

        <ul className="space-y-5 my-5">
          {!!state?.favourites &&
            state?.favourites.slice().map((blog) => (
              <li key={blog.id}>
                <Link
                  to={`/single-blog/${blog?.id}`}
                  className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer"
                >
                  {blog?.title}
                </Link>
                <p className="text-slate-600 text-sm">{blog?.tags}</p>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}
