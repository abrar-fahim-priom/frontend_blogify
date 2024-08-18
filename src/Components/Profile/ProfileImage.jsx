import { useRef } from "react";
import { useProfile } from "../../Hooks/useProfile.js";
import { actions } from "../../actions/index.js";
import { api } from "../../api/index.js";
import edit from "../../assets/icons/edit.svg";

export default function ProfileImage({ state, user }) {
  const { dispatch } = useProfile();
  const fileUploaderRef = useRef();

  const avatar = state?.avatar ?? null;

  const handleImageUpload = (event) => {
    event.preventDefault();

    fileUploaderRef.current.addEventListener("change", updateImageDisplay);
    fileUploaderRef.current.click();
  };

  const updateImageDisplay = async () => {
    try {
      const formData = new FormData();
      for (const file of fileUploaderRef.current.files) {
        formData.append("avatar", file);
      }

      const response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/profile/avatar`,
        formData
      );
      if (response.status === 200) {
        console.log(response.data);
        dispatch({
          type: actions.profile.IMAGE_UPDATED,
          data: response.data,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: actions.profile.DATA_FETCH_ERROR,
        error: error.message,
      });
    }
  };

  return (
    <div className="relative mb-8 max-h-[180px] max-w-[180px] h-[120px] w-[120px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
      {avatar ? (
        <img
          src={`${
            import.meta.env.VITE_SERVER_BASE_URL
          }/uploads/avatar/${avatar}`}
          alt="User Avatar"
          className="w-full h-full rounded-full grid place-items-center"
        />
      ) : (
        <div className="w-full h-full bg-orange-600 text-white grid place-items-center text-5xl rounded-full">
          {/* <!-- User's first name initial --> */}
          <span className="">{state?.firstName?.charAt(0)}</span>
        </div>
      )}

      {user === "loggedinUser" && (
        <form id="form" encType="multipart/form-data">
          <button
            className="grid place-items-center absolute bottom-0 right-0 h-7 w-7 rounded-full bg-slate-700 hover:bg-slate-700/80"
            onClick={handleImageUpload}
            type="submit"
          >
            <img src={edit} alt="Edit" />
          </button>
          <input id="file" type="file" ref={fileUploaderRef} hidden />
        </form>
      )}
    </div>
  );
}
