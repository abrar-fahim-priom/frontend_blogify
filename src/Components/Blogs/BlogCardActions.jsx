import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { actions } from "../../actions/index.js";
import ThreedotsIcon from "../../assets/icons/3dots.svg";
import DeleteIcon from "../../assets/icons/delete.svg";
import EditIcon from "../../assets/icons/edit.svg";
import { useAuth } from "../../Hooks/useAuth";
import useAxios from "../../Hooks/useAxios";
import { useBlog } from "../../Hooks/useBlog";
import { useProfile } from "../../Hooks/useProfile";

export default function BlogCardActions({ myBlogs, blog }) {
  const [showAction, setShowAction] = useState(false);
  const { auth } = useAuth();
  const { api } = useAxios();
  const navigate = useNavigate();
  const { dispatch } = useBlog();
  const { dispatch: profileDispatcher } = useProfile();

  const isMe = blog?.author?.id === auth?.user?.id;

  const editBlog = () => {
    navigate("/blog-entry", { state: { blog } });
  };

  const handleDeleteBlog = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog post?"
    );

    if (confirmDelete) {
      try {
        const response = await api.delete(
          `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blog?.id}`
        );

        if (response.status === 200) {
          console.log(response.data);
          console.log(myBlogs);
          if (myBlogs === "myBlogs") {
            profileDispatcher({
              type: actions.profile.BLOG_DELETED,
              data: blog.id,
            });
          } else {
            dispatch({
              type: actions.blog.BLOG_DELETED,
              data: blog.id,
            });
          }

          // Show success alert
          alert("Blog post deleted successfully!");
        }
      } catch (error) {
        console.log(error);
        dispatch({
          type: actions.blog.DATA_FETCH_ERROR,
          error: error.message,
        });

        // Show error alert
        alert("An error occurred while deleting the blog post.");
      }
    } else {
      alert("Blog post deletion canceled.");
    }
  };

  return (
    <div className="absolute right-0 top-0">
      {isMe && (
        <button
          onClick={(e) => {
            e.stopPropagation(); // Stop the click event from propagating to the parent elements
            setShowAction(!showAction);
          }}
        >
          <img src={ThreedotsIcon} alt="3 dots of Action" />
        </button>
      )}

      {/* <!-- Action Menus Popup --> */}
      {showAction && (
        <div className="action-modal-container">
          <button
            onClick={(e) => {
              e.stopPropagation(); // Stop the click event from propagating to the parent elements
              editBlog();
            }}
            className="action-menu-item hover:text-lwsGreen"
          >
            <img src={EditIcon} alt="Edit" />
            Edit
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation(); // Stop the click event from propagating to the parent elements
              handleDeleteBlog();
            }}
            className="action-menu-item hover:text-red-500"
          >
            <img src={DeleteIcon} alt="Delete" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
