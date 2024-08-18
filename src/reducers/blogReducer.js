import { actions } from "../actions";

const initialState = {
  total: 0,
  page: 0,
  limit: 0,
  blogs: [],
  most_popular: [],
  favourites: [],
  loading: false,
  error: null,
};

const blogReducer = (state, action) => {
  switch (action.type) {
    case actions.blog.DATA_FETCHING: {
      return {
        ...state,
        loading: true,
      };
    }
    case actions.blog.DATA_FETCHED: {
      return {
        ...state,
        loading: false,
        blogs: action.append
          ? [...state.blogs, ...action.data.blogs]
          : action.data.blogs, // Append or replace blogs
        total: action.data.total,
        page: action.data.page,
        limit: action.data.limit,
      };
    }

    case actions.blog.MOST_POPULAR_FETCHED: {
      return {
        ...state,
        loading: false,
        most_popular: action.data,
      };
    }

    case actions.blog.FAVOURITES_FETCHED: {
      return {
        ...state,
        loading: false,
        favourites: action.data,
      };
    }

    case actions.blog.DATA_FETCH_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }

    case actions.blog.DATA_CREATED: {
      return {
        ...state,
        loading: false,
        blogs: [...state.blogs, action.data],
      };
    }

    case actions.blog.BLOG_DELETED: {
      const updatedBlogs = state.blogs.filter(
        (item) => item.id !== action.data
      );
      return {
        ...state,
        loading: false,
        blogs: updatedBlogs,
        most_popular: state.most_popular.filter(
          (item) => item.id !== action.data
        ),
      };
    }

    case actions.blog.RESET_BLOG_STATE: {
      return {
        ...state,
        blogs: [],
        page: 0,
        total: 0,
        limit: 0,
        loading: false,
      };
    }

    default:
      return state;
  }
};

export { blogReducer, initialState };
