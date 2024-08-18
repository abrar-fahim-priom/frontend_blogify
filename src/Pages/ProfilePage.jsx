import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../Common/Header";
import MyBlogs from "../Components/Profile/MyBlogs";
import ProfileInfo from "../Components/Profile/ProfileInfo";
import { useAuth } from "../Hooks/useAuth";
import { useAuthor } from "../Hooks/useAuthor";
import useAxios from "../Hooks/useAxios";
import { useProfile } from "../Hooks/useProfile";
import { actions } from "../actions";

export default function ProfilePage() {
  const { state, dispatch } = useProfile();
  const { api } = useAxios();
  const { auth } = useAuth();
  const location = useLocation();

  const { authorId, setAuthorId } = useAuthor(); // Get authorId from context
  const navigationAuthorId = location.state?.passAuthorId;

  console.log(navigationAuthorId);
  const profileId = navigationAuthorId || authorId || auth?.user?.id;

  console.log(auth?.user?.id);

  // const profileId = authorId || auth?.user?.id; // Determine the profile ID to fetch

  const [profileState, setProfileState] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log(authorId);

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
            // console.log(response.data);
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
            // console.log(response.data);
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
          <ProfileInfo user="loggedinUser" state={state} />
        ) : (
          <ProfileInfo user="authorUser" state={profileState} />
        )}

        {profileId === auth?.user?.id ? (
          <MyBlogs myBlogs="myBlogs" state={state} />
        ) : (
          <MyBlogs myBlogs="myBlogs" state={profileState} />
        )}
      </div>
    </main>
  );
}
