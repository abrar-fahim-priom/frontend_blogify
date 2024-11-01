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

  console.log(state.favourites);

  useEffect(() => {
    console.log(auth?.user?.id);
    if (singleBlog?.likes && auth?.user?.id) {
      console.log(singleBlog?.likes); // THIS PRINTS['66c2f6630aad847b524a01c0']

      console.log(auth?.user?.id); // THIS PRINTS 66c2f6630aad847b524a01c0   (NO COLLON)
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

  const handleLiked = async () => {
    try {
      const response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${singleBlog.id}/like`
      );

      console.log(singleBlog);
      if (response.status === 200) {
        const { isLiked, likes } = response.data;
        console.log(response.data.likes);

        setLiked(isLiked);
        setLikeLength(likes.length); // Update the like count based on the response
      }
    } catch (error) {
      console.error("Error liking the blog:", error);
    }
  };

  const handleFavourite = async () => {
    try {
      const response = await api.patch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${
          singleBlog.id
        }/favourite`
      );

      if (response.status === 200) {
        console.log(response.data);
        const { isFavourite } = response.data;
        setFavourite(isFavourite);
      }
    } catch (error) {
      console.error("Error liking the blog:", error);
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
