import BlogCard from "./BlogCard";

export default function BlogList({ myBlogs, blogs }) {
  // console.log(blogs);
  return (
    <div>
      {!!blogs &&
        blogs.map((blog) => (
          <BlogCard key={blog.id} myBlogs={myBlogs} blog={blog} />
        ))}
    </div>
  );
}
