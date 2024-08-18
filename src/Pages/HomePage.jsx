import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { actions } from "../actions";
import Header from "../Common/Header";
import BlogList from "../Components/Blogs/BlogList";
import Sidebar from "../Components/Blogs/Sidebar";
import useAxios from "../Hooks/useAxios";
import { useBlog } from "../Hooks/useBlog";

export default function HomePage() {
  const { state, dispatch } = useBlog();
  const { api } = useAxios();
  const [hasMore, setHasMore] = useState(true);

  // Function to fetch blogs based on the page number
  const fetchBlogs = async (pageNumber = 1) => {
    try {
      const response = await api.get(
        `${
          import.meta.env.VITE_SERVER_BASE_URL
        }/blogs?page=${pageNumber}&limit=${state.limit || 10}`
      );

      if (response.status === 200) {
        const { blogs, total, page, limit } = response.data;

        dispatch({
          type: actions.blog.DATA_FETCHED,
          data: { blogs, total, page, limit },
          append: pageNumber > 1, // Only append if page number is greater than 1
        });

        if (state.blogs.length + blogs.length >= total) {
          setHasMore(false);
        }
      }
    } catch (error) {
      dispatch({
        type: actions.blog.DATA_FETCH_ERROR,
        error: error.message,
      });
    }
  };

  // Effect to fetch initial data and reset state when the component mounts
  useEffect(() => {
    // Reset the state and fetch initial blogs
    dispatch({ type: actions.blog.DATA_FETCHING });
    fetchBlogs(1); // Fetch the first page
    setHasMore(true); // Ensure hasMore is true on initial load

    // Cleanup function to reset state if needed (optional)
    return () => {
      dispatch({ type: actions.blog.RESET_BLOG_STATE });
    };
  }, [dispatch]);

  // Function to handle fetching next blogs for infinite scroll
  const fetchNextBlogs = () => {
    if (state.page < Math.ceil(state.total / state.limit)) {
      fetchBlogs(state.page + 1);
    } else {
      setHasMore(false);
    }
  };

  return (
    <div className="bg-[#030317] text-white">
      <Header />
      <main>
        <section>
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
              <div className="space-y-3 md:col-span-5">
                <InfiniteScroll
                  dataLength={state.blogs.length}
                  next={fetchNextBlogs}
                  hasMore={hasMore}
                  loader={<div>Loading more blogs...</div>}
                  endMessage={<div>No more blogs to show</div>}
                >
                  <BlogList blogs={state.blogs} />
                </InfiniteScroll>
              </div>
              <Sidebar />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
