import { actions } from "../actions";

const initialState = {
  id: "",
  email: "",
  firstName: "",
  lastName: "",
  avatar: null,
  favourites: [],
  bio: "",
  blogs: [],
  loading: false,
  error: null,
};

const profileReducer = (state, action) => {
  switch (action.type) {
    case actions.profile.DATA_FETCHING: {
      return {
        ...state,
        loading: true,
      };
    }

    case actions.profile.DATA_FETCHED: {
      return {
        ...state,
        loading: false,
        id: action.data.id,
        email: action.data.email,
        firstName: action.data.firstName,
        lastName: action.data.lastName,
        avatar: action.data.avatar,
        favourites: action.data.favourites,
        bio: action.data.bio,
        blogs: action.data.blogs,
      };
    }

    case actions.profile.USER_DATA_EDITED: {
      return {
        ...state,
        loading: false,
        bio: action.data.user.bio,
      };
    }

    case actions.profile.DATA_FETCH_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }

    case actions.profile.IMAGE_UPDATED: {
      return {
        ...state,
        loading: false,
        avatar: action.data.user.avatar,
      };
    }

    case actions.profile.BLOG_DELETED: {
      const updatedBlogs = state.blogs.filter(
        (item) => item.id !== action.data
      );

      return {
        ...state,
        loading: false,
        blogs: updatedBlogs,
      };
    }

    default: {
      return state;
    }
  }
};

export { initialState, profileReducer };
