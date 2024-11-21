import { useEffect, useState } from "react";
import CommentIcon from "../../../assets/icons/comment.svg";
import HeartFillIcon from "../../../assets/icons/heart-filled.svg";
import HeartIcon from "../../../assets/icons/heart.svg";
import LikeFilled from "../../../assets/icons/like-filled.svg";
import LikeIcon from "../../../assets/icons/like.svg";
import { useAuth } from "../../../Hooks/useAuth";
import useAxios from "../../../Hooks/useAxios";
import { useBlog } from "../../../Hooks/useBlog";

export default function FloatingActions({
  singleBlog,
  setCommentLength,
  commentLength,
}) {
  const { auth } = useAuth();
  const { api } = useAxios();
  const { state, dispatch } = useBlog();

  const [liked, setLiked] = useState(false);
  const [favourite, setFavourite] = useState(false);
  const [likeLength, setLikeLength] = useState(0);

  useEffect(() => {
    if (singleBlog?.likes && auth?.user?.id) {
      const isLiked = singleBlog.likes.includes(auth.user.id);
      setLiked(isLiked);
    }

    setLikeLength(singleBlog?.likes?.length || 0);

    if (state?.favourites && singleBlog?.id) {
      const isFavourite = state.favourites.some(
        (fav) => fav.id === singleBlog.id
      );
      setFavourite(isFavourite);
    }
  }, [singleBlog, auth, state.favourites]);

  const handleAction = (action) => {
    if (!auth || !auth.user) {
      alert("Please log in to perform this action.");
      return false;
    }
    return true;
  };

  const handleLiked = async () => {
    if (!handleAction("like")) return;

    try {
      const response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${singleBlog.id}/like`
      );
      if (response.status === 200) {
        const { isLiked, likes } = response.data;
        setLiked(isLiked);
        setLikeLength(likes.length);
      }
    } catch (error) {
      console.error("Error liking the blog:", error);
    }
  };

  const handleFavourite = async () => {
    if (!handleAction("favourite")) return;

    try {
      const response = await api.patch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${
          singleBlog.id
        }/favourite`
      );
      if (response.status === 200) {
        const { isFavourite } = response.data;
        setFavourite(isFavourite);
      }
    } catch (error) {
      console.error("Error adding blog to favourites:", error);
    }
  };

  return (
    <div className="floating-action">
      <ul className="floating-action-menus">
        <li>
          <button onClick={handleLiked}>
            <img src={!liked ? LikeIcon : LikeFilled} alt="like" />
          </button>
          <span>{likeLength}</span>
        </li>

        <li>
          <button onClick={handleFavourite}>
            <img src={!favourite ? HeartIcon : HeartFillIcon} alt="Favourite" />
          </button>
        </li>
        <a href="#comments">
          <li>
            <img src={CommentIcon} alt="Comments" />
            <span>{commentLength || 0}</span>
          </li>
        </a>
      </ul>
    </div>
  );
}
