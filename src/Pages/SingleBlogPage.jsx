import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { actions } from "../actions/index.js";
import Header from "../Common/Header.jsx";
import CommentSection from "../Components/Blogs/SingleBlog/CommentSection.jsx";
import FloatingActions from "../Components/Blogs/SingleBlog/FloatingActions.jsx";
import SingleBlogContent from "../Components/Blogs/SingleBlog/SingleBlogContent.jsx";
import { useAuth } from "../Hooks/useAuth";
import { useBlog } from "../Hooks/useBlog";

export default function SingleBlogPage() {
  const { blogId } = useParams();
  const { dispatch } = useBlog();
  const [singleBlog, setSingleBlog] = useState({});
  const [commentLength, setCommentLength] = useState(0);
  const { auth, setAuth } = useAuth();
  const isLoggedIn = auth && auth.user;

  useEffect(() => {
    dispatch({
      type: actions.blog.DATA_FETCHING,
    });
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blogId}`
        );

        if (response.status === 200) {
          setSingleBlog(response.data);
          setCommentLength(response.data.comments.length);
        }
      } catch (error) {
        console.log(error);
        dispatch({
          type: actions.blog.DATA_FETCH_ERROR,
          error: err.message,
        });
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="bg-[#030317] text-white">
      <Header />

      <main>
        <SingleBlogContent singleBlog={singleBlog} />
        {isLoggedIn ? (
          <CommentSection
            setCommentLength={setCommentLength}
            singleBlog={singleBlog}
          />
        ) : (
          <div className="m-5 font-medium text-xl mt-10 pb-6 text-center">
            Please Login to access reaction and comment
          </div>
        )}
      </main>

      <FloatingActions
        commentLength={commentLength}
        setCommentLength={setCommentLength}
        singleBlog={singleBlog}
      />
    </div>
  );
}
