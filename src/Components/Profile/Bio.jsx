import { useState } from "react";
import { useProfile } from "../../Hooks/useProfile";
import { actions } from "../../actions/index.js";
import { api } from "../../api/index.js";
import editIcon from "../../assets/icons/edit.svg";
import saveIcon from "../../assets/icons/share.svg";

export default function Bio({ bioState, user }) {
  const { state, dispatch } = useProfile();
  const [editMode, setEditMode] = useState(false);
  console.log(bioState);
  const [bio, setBio] = useState(bioState);

  console.log(bio);

  const handleBioEdit = async () => {
    dispatch({ type: actions.profile.DATA_FETCHING });

    try {
      const formData = new FormData();
      formData.append("bio", bio);

      const response = await api.patch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/profile`,
        formData
      );

      if (response.status === 200) {
        console.log(response);
        dispatch({
          type: actions.profile.USER_DATA_EDITED,
          data: response.data,
        });
      }
      setEditMode(false);
    } catch (error) {
      dispatch({
        type: actions.profile.DATA_FETCH_ERROR,
        error: error.message,
      });
    }
  };

  const handleEditClick = () => {
    console.log("Edit button clicked");
    setEditMode(true);
  };

  return (
    <div className="mt-4 flex items-start gap-2 lg:mt-6">
      <div className="flex-1">
        {!editMode ? (
          <p className="leading-[188%] text-gray-400 lg:text-lg">{bio}</p>
        ) : (
          <textarea
            value={bio}
            rows={4}
            cols={55}
            className="p-2 leading-[188%] text-gray-600 lg:text-lg rounded-md"
            onChange={(e) => setBio(e.target.value)}
          />
        )}
      </div>

      {user === "loggedinUser" && (
        <button
          className="flex-center h-7 w-7 rounded-full"
          onClick={!editMode ? handleEditClick : handleBioEdit}
        >
          {!editMode ? (
            <img src={editIcon} alt="Edit" />
          ) : (
            <img src={saveIcon} alt="Save" />
          )}
        </button>
      )}
    </div>
  );
}
