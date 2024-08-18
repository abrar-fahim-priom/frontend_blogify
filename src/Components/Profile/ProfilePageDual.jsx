import { useEffect, useState } from "react";
import Header from "../Common/Header";
import MyBlogs from "../Components/Profile/MyBlogs";
import ProfileInfo from "../Components/Profile/ProfileInfo";
import { useAuth } from "../Hooks/useAuth";
import useAxios from "../Hooks/useAxios";
import { useProfile } from "../Hooks/useProfile";
import { actions } from "../actions";
import { useAuthor } from "../context/AuthorContext"; // Import the useAuthor hook

export default function ProfilePage() {
  const { state, dispatch } = useProfile();
  const { api } = useAxios();
  const { auth } = useAuth();
  const { authorId, setAuthorId } = useAuthor(); // Get authorId from context

  const profileId = authorId || auth?.user?.id; // Determine the profile ID to fetch

  const [profileState, setProfileState] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (profileId === auth?.user?.id) {
      dispatch({
        type: actions.profile.DATA_FETCHING,
      });

      const fetchProfile = async () => {
        try {
          const response = await api.get(
            `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${auth?.user?.id}`
          );

          if (response.status === 200) {
            console.log(response.data);
            dispatch({
              type: actions.profile.DATA_FETCHED,
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

      fetchProfile();
    } else {
      setLoading(true);
      setError(null);

      const fetchAuthorProfile = async () => {
        try {
          const response = await api.get(
            `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${profileId}`
          );

          if (response.status === 200) {
            console.log(response.data);
            setProfileState(response.data);
          }
        } catch (error) {
          console.log(error);
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchAuthorProfile();
    }

    return () => {
      // Cleanup function to reset authorId when component unmounts
      setAuthorId(null);
    };
  }, [profileId]);

  return (
    <main className="mx-auto max-w-[1020px] py-8">
      <div className="container">
        <Header />

        {profileId === auth?.user?.id ? (
          <ProfileInfo state={state} />
        ) : (
          <ProfileInfo state={profileState} />
        )}

        {profileId === auth?.user?.id ? (
          <MyBlogs state={state} />
        ) : (
          <MyBlogs state={profileState} />
        )}
      </div>
    </main>
  );
}
