export default function BlogBody(){
    return (
        <>
        <img
            className="blog-thumb"
            src="./assets/blogs/React-Roadmap.jpg"
            alt=""
          />
          <div className="mt-2 relative">
            <a href="./single-blog.html">
              <h3 className="text-slate-300 text-xl lg:text-2xl">
                <a href="./single-blog.html">React Roadmap in 2024</a>
              </h3>
            </a>
            <p className="mb-6 text-base text-slate-500 mt-1">
              Aenean eleifend ante maecenas pulvinar montes lorem et pede dis
              dolor pretium donec dictum. Vici consequat justo enim. Venenatis
              eget adipiscing luctus lorem.
            </p>
        </>
    );
}