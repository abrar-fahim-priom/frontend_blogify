import { useEffect } from "react";
import { actions } from "../../actions/index.js";
// import useAxios from "../../Hooks/useAxios.js";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useBlog } from "../../Hooks/useBlog";

export default function MostPopular() {
  const { state, dispatch } = useBlog();
  // const { api } = useAxios();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({
      type: actions.blog.DATA_FETCHING,
    });
    const fetchMostPopular = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/popular`
        );

        if (response.status === 200) {
          // console.log(response.data);
          dispatch({
            type: actions.blog.MOST_POPULAR_FETCHED,
            data: response.data.blogs,
          });

          console.log(state.most_popular);
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

  const handleAuthorProfile = (e, authorId) => {
    e.stopPropagation();
    const passAuthorId = authorId;

    navigate("/profile", { state: { passAuthorId } });
  };

  return (
    <>
      <div className="sidebar-card">
        <h3 className="text-slate-300 text-xl lg:text-2xl font-semibold">
          Most Popular 👍️
        </h3>

        <ul className="space-y-5 my-5">
          {!!state?.most_popular &&
            state?.most_popular.slice().map((blog) => (
              <li key={blog.id}>
                <Link
                  to={`/single-blog/${blog?.id}`}
                  className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer"
                >
                  {blog?.title}
                </Link>
                <p className="text-slate-600 text-sm">
                  by
                  <button
                    onClick={(e) => handleAuthorProfile(e, blog?.author?.id)}
                  >
                    {blog?.author?.firstName}
                  </button>
                  <span>·</span> {blog?.likes.length} Likes
                </p>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}
