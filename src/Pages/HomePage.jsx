import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { actions } from "../actions";
import Header from "../Common/Header";
import SkeletonLoader from "../Common/SkeletonLoader";
import BlogList from "../Components/Blogs/BlogList";
import Footer from "../Components/Blogs/Footer";
import MostPopular from "../Components/Blogs/MostPopular";
import Favourites from "../Components/Blogs/YourFavourites";
import useAxios from "../Hooks/useAxios";
import { useBlog } from "../Hooks/useBlog";

export default function HomePage() {
  const { state, dispatch } = useBlog();
  const { api } = useAxios();
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Function to fetch blogs
  const fetchBlogs = async (pageNumber = 1) => {
    setIsLoading(true);
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
          append: pageNumber > 1,
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
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    dispatch({ type: actions.blog.DATA_FETCHING });
    fetchBlogs(1);
    setHasMore(true);
  }, [dispatch]);

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
              {/* Blog Listing Section */}
              <div className="space-y-3 md:col-span-5">
                {isLoading && state.blogs.length === 0 ? (
                  <SkeletonLoader />
                ) : (
                  <InfiniteScroll
                    dataLength={state.blogs.length}
                    next={fetchNextBlogs}
                    hasMore={hasMore}
                    loader={
                      <div className="flex justify-center my-4">
                        <SkeletonLoader />
                      </div>
                    }
                    endMessage={
                      <div className="flex m-3 items-center justify-center">
                        No more blogs to show
                      </div>
                    }
                  >
                    <BlogList blogs={state.blogs} />
                  </InfiniteScroll>
                )}
              </div>

              {/* Sidebar Section */}
              <div className="md:col-span-2 space-y-6">
                {/* Most Popular Component */}
                <div className=" p-4 rounded-lg">
                  <MostPopular /> {/* Add the Most Popular component */}
                </div>

                {/* Your Favourites Section */}
                <div className=" p-4 rounded-lg">
                  <Favourites /> {/* Add the Favourites component */}
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </div>
  );
}
