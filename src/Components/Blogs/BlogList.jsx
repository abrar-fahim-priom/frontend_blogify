import BlogCard from "./BlogCard";

export default function BlogList({ myBlogs, blogs }) {
  // console.log(blogs);
  return (
    <>
      {!!blogs &&
        blogs
          // .slice() // Create a shallow copy of the array to avoid mutating the original array
          // .reverse()
          .map((blog) => (
            <BlogCard key={blog.id} myBlogs={myBlogs} blog={blog} />
          ))}{" "}
    </>
  );
}
