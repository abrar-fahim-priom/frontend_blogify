import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthor } from "../../Hooks/useAuthor";
import BlogCardActions from "./BlogCardActions";
import BlogEntry from "./BlogEntry";

function getFirstThreeLines(text) {
  const lines = text.split("\n");
  return lines.slice(0, 1).join("\n");
}

function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

export default function BlogCard({ myBlogs, blog }) {
  const [enableEditField, setEnableEditFiled] = useState(false);
  const navigate = useNavigate();
  const { setAuthorId } = useAuthor();

  const handleAuthorProfile = (e) => {
    e.stopPropagation();
    const passAuthorId = blog.author.id;
    setAuthorId(passAuthorId);
    navigate("/profile", { state: { passAuthorId } });
  };

  return (
    <>
      {enableEditField ? (
        <BlogEntry blog={blog} onUpdate={() => setEnableEditFiled(false)} />
      ) : (
        <div className="blog-card">
          <Link to={`/single-blog/${blog?.id}`}>
            <img
              className="blog-thumb"
              src={`${import.meta.env.VITE_SERVER_BASE_URL}/uploads/blog/${
                blog?.thumbnail
              }`}
              alt=""
            />
          </Link>

          <div className="mt-2 relative">
            <Link to={`/single-blog/${blog?.id}`}>
              <h3 className="text-slate-300 text-xl lg:text-2xl">
                <Link to={`/single-blog/${blog?.id}`}>{blog?.title}</Link>
              </h3>
            </Link>
            <p className="mb-6 text-base text-slate-500 mt-1">
              {getFirstThreeLines(blog?.content)}
            </p>

            {/* <!-- Meta Informations --> */}
            <div
              onClick={handleAuthorProfile}
              className="flex justify-between items-center"
            >
              <div className="flex items-center capitalize space-x-2">
                {blog?.author?.avatar ? (
                  <>
                    <img
                      src={`${
                        import.meta.env.VITE_SERVER_BASE_URL
                      }/uploads/avatar/${blog.author.avatar}`}
                      alt="Author Avatar"
                      className="avater-img w-9 rounded-full"
                    />
                  </>
                ) : (
                  <div
                    className="avater-img flex items-center
                   justify-center rounded-full w-10 h-10 bg-indigo-600 text-white"
                  >
                    <span className="">
                      {blog?.author?.firstName?.charAt(0)}
                    </span>
                  </div>
                )}

                <div>
                  <h5 className="text-slate-500 text-sm">
                    <Link>{blog?.author?.firstName}</Link>
                  </h5>
                  <div className="flex items-center text-xs text-slate-700">
                    <span> {formatDate(blog.createdAt)} </span>
                  </div>
                </div>
              </div>

              <div className="text-sm px-2 py-1 text-slate-700">
                <span>{blog?.likes.length} Likes</span>
              </div>
            </div>

            <BlogCardActions
              myBlogs={myBlogs}
              setEnableEditFiled={() => setEnableEditFiled(true)}
              blog={blog}
            />
          </div>
        </div>
      )}
    </>
  );
}
