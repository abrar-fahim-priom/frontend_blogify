import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DeleteIcon from "../../../assets/icons/delete.svg";

import { actions } from "../../../actions/index.js";
import Field from "../../../Common/Field";
import { useAuth } from "../../../Hooks/useAuth";
import useAxios from "../../../Hooks/useAxios";

import { useBlog } from "../../../Hooks/useBlog";
import { useProfile } from "../../../Hooks/useProfile";

export default function CommentSection({ singleBlog, setCommentLength }) {
  const { state } = useProfile();
  const { api } = useAxios();
  const { dispatch } = useBlog();
  const { auth, setAuth } = useAuth();
  const [blogDetails, setBlogDetails] = useState(singleBlog);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    // Update the state whenever singleBlog prop changes
    setBlogDetails(singleBlog);
  }, [singleBlog]);

  // console.log(singleBlog);
  console.log(blogDetails);

  const handleCommentSubmit = (formData) => {
    dispatch({
      type: actions.blog.DATA_FETCHING,
    });

    const postComment = async () => {
      try {
        const response = await api.post(
          `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${
            singleBlog.id
          }/comment`,
          { content: formData.comment }
        );
        console.log(response.data);
        if (response.status === 200) {
          // console.log(response.data);

          setBlogDetails(response.data);
          setCommentLength(response.data.comments.length);

          reset();
        }
      } catch (error) {
        console.log(error);
        dispatch({
          type: actions.blog.DATA_FETCH_ERROR,
          error: err.message,
        });
      }
    };

    postComment();
  };

  const handleDeleteComment = (commentId) => {
    const deleteComment = async () => {
      try {
        const response = await api.delete(
          `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${
            singleBlog.id
          }/comment/${commentId}`
        );

        console.log(response.data);
        if (response.status === 200) {
          // console.log(response.data);

          setBlogDetails(response.data);
          setCommentLength(response.data.comments.length);
        }
      } catch (error) {
        console.log(error);
        // dispatch({
        //   type: actions.blog.DATA_FETCH_ERROR,
        //   error: err.message,
        // });
      }
    };

    deleteComment();
  };

  const avatar = auth?.user?.avatar || state?.avatar || null;

  return (
    <section id="comments">
      <div className="mx-auto w-full md:w-10/12 container">
        <h2 className="text-3xl font-bold my-8">
          Comments ({blogDetails?.comments?.length || 0})
        </h2>
        <div className="flex items -center space-x-4">
          {avatar ? (
            <>
              <img
                src={`${
                  import.meta.env.VITE_SERVER_BASE_URL
                }/uploads/avatar/${avatar}`}
                alt="Author Avatar"
                className="avater-img w-9 h-9 rounded-full"
              />
            </>
          ) : (
            <div
              className="avater-img flex items-center
                   justify-center rounded-full w-10 h-10 bg-indigo-600 text-white"
            >
              <span className="">
                {blogDetails?.author?.firstName?.charAt(0)}
              </span>
            </div>
          )}
          <form onSubmit={handleSubmit(handleCommentSubmit)}>
            <div className="w-full">
              <Field error={errors.comment}>
                <textarea
                  {...register("comment", {
                    required: "Typing something Required",
                  })}
                  className={`w-full bg-[#030317] border ${
                    errors.comment ? "border-red-500" : "border-slate-500"
                  } text-slate-300 p-4 rounded-md focus:outline-none`}
                  placeholder="Write a comment"
                  id="comment"
                  name="comment"
                  rows={4}
                  cols={80}
                />
              </Field>

              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                >
                  Comment
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* <!-- Comment One --> */}

        {blogDetails?.comments?.map((comment, index) => {
          return (
            <div key={index} className="flex items-start space-x-4 my-8">
              {comment?.author.avatar ? (
                <>
                  <img
                    src={`${
                      import.meta.env.VITE_SERVER_BASE_URL
                    }/uploads/avatar/${comment?.author.avatar}`}
                    alt="Author Avatar"
                    className="avater-img w-9 h-9 rounded-full"
                  />
                </>
              ) : (
                <div
                  className="avater-img flex items-center
                   justify-center rounded-full w-10 h-10 bg-indigo-600 text-white"
                >
                  <span className="">
                    {blogDetails?.author?.firstName?.charAt(0)}
                  </span>
                </div>
              )}
              <div className="w-full flex justify-between  ">
                <div>
                  <h5 className="text-slate-500 font-bold">
                    {comment?.author.firstName + " " + comment?.author.lastName}
                  </h5>
                  <p className="text-slate-300">{comment?.content}</p>
                </div>

                {comment?.author?.id === auth?.user?.id && (
                  <button onClick={() => handleDeleteComment(comment?._id)}>
                    {" "}
                    <img src={DeleteIcon} alt="" />{" "}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
