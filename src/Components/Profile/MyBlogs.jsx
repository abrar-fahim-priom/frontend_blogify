import BlogList from "../Blogs/BlogList";

export default function MyBlogs({ myBlogs, state }) {
  // const { state } = useProfile();
  console.log(state);

  const blogs = state?.blogs;
  return (
    <>
      <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">Your Blogs</h4>
      <div className="my-6 space-y-4">
        <BlogList myBlogs={myBlogs} blogs={blogs} />
      </div>
    </>
  );
}
