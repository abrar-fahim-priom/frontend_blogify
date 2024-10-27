export default function SingleBlogContent({ singleBlog }) {
  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  return (
    <section>
      <div className="container text-center py-8">
        <h1 className="font-bold text-3xl md:text-5xl">{singleBlog?.title}</h1>
        <div className="flex justify-center items-center my-4 gap-4">
          <div className="flex items-center capitalize space-x-2">
            {singleBlog?.author?.avatar ? (
              <>
                <img
                  src={`${
                    import.meta.env.VITE_SERVER_BASE_URL
                  }/uploads/avatar/${singleBlog?.author?.avatar}`}
                  alt="Author Avatar"
                  className="avater-img w-9 rounded-full"
                />
              </>
            ) : (
              <div
                className="avater-img flex items-center
                   justify-center rounded-full w-10 h-10 bg-indigo-600 text-white"
              >
                <span className="">
                  {singleBlog?.author?.firstName?.charAt(0)}
                </span>
              </div>
            )}
            <h5 className="text-slate-500 text-sm">
              {singleBlog?.author?.firstName}
            </h5>
          </div>
          <span className="text-sm text-slate-700 dot">
            {formatDate(singleBlog?.createdAt)}
          </span>
          <span className="text-sm text-slate-700 dot">
            {singleBlog?.likes?.length || 0} Likes
          </span>
        </div>
        <img
          className="mx-auto w-full md:w-8/12 object-cover h-80 md:h-96"
          src={`${import.meta.env.VITE_SERVER_BASE_URL}/uploads/blog/${
            singleBlog?.thumbnail
          }`}
          alt=""
        />

        {/* <!-- Tags --> */}
        <ul className="tags">
          {(singleBlog?.tags ?? []).map((tag, index) => (
            <li key={index}>{tag.trim()}</li>
          ))}
        </ul>

        {/* <!-- Content --> */}
        <div className="mx-auto w-full md:w-10/12 text-slate-300 text-base md:text-lg leading-8 py-2 !text-left">
          {singleBlog?.content}
        </div>
      </div>
    </section>
  );
}
