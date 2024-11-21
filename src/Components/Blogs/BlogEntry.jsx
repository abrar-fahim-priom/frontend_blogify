import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

import Field from "../../Common/Field";
import Header from "../../Common/Header";
import useAxios from "../../Hooks/useAxios.js";

export default function BlogEntry({ onUpdate }) {
  const { api } = useAxios(); // Custom hook call inside the component
  const fileUploaderRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();

  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const blogEdit = location.state?.blog;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (blogEdit) {
      reset({
        blogTitle: blogEdit.title || "",
        tags: blogEdit.tags || "",
        content: blogEdit.content || "",
      });

      if (blogEdit.thumbnail) {
        setPreviewUrl(
          `${import.meta.env.VITE_SERVER_BASE_URL}/uploads/blog/${
            blogEdit.thumbnail
          }`
        );
      }
    }
    setIsLoading(false);
  }, [blogEdit, reset]);

  const handleImageUpload = (e) => {
    e.stopPropagation(); // Prevent form submission
    const file = fileUploaderRef.current.files[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = (e) => {
    e.stopPropagation(); // Prevent form submission
    setPreviewUrl(null);
    fileUploaderRef.current.value = "";
  };

  const handlePostSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.blogTitle);
      formData.append("tags", data.tags);
      formData.append("content", data.content);

      const file = fileUploaderRef.current.files[0];
      if (file) {
        formData.append("thumbnail", file);
      } else if (previewUrl === null && blogEdit?.thumbnail) {
        formData.append("thumbnail", ""); // Indicate removal of server image
      }

      const method = blogEdit ? "patch" : "post";
      const url = blogEdit
        ? `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blogEdit.id}`
        : `${import.meta.env.VITE_SERVER_BASE_URL}/blogs`;

      await api({
        method,
        url,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Show success alert
      alert("Blog post submitted successfully!");

      // Navigate to home page
      navigate("/");

      if (onUpdate) onUpdate();
    } catch (error) {
      console.error("API error:", error);

      // Show error alert
      alert("An error occurred while submitting the blog post.");
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-[#030317] text-white">
      <Header />

      <main>
        <section>
          <div className="container">
            <form
              key={blogEdit ? `edit-${blogEdit.id}` : "create"}
              onSubmit={handleSubmit(handlePostSubmit)}
              className="createBlog"
            >
              <div className="grid place-items-center bg-slate-600/20 h-[150px] rounded-md my-4">
                {previewUrl ? (
                  <div className="relative">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="h-[150px] w-[150px] object-cover rounded-md"
                      onError={(e) => {
                        e.target.src = "/path/to/placeholder/image.png"; // Optional: handle image load error
                      }}
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-700 transition-all"
                    >
                      &times;
                    </button>
                  </div>
                ) : (
                  <div
                    className="flex items-center gap-4 hover:scale-110 transition-all cursor-pointer"
                    onClick={() => fileUploaderRef.current.click()}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                      />
                    </svg>
                    <button type="button">Upload Your Image</button>
                  </div>
                )}
              </div>

              <div className="mb-6">
                <Field label="" error={errors.firstName}>
                  <input
                    {...register("blogTitle", {
                      required: "Blog Title is Required",
                    })}
                    className={`${
                      errors.blogTitle ? "border-red-500" : "border-gray-200"
                    }`}
                    type="text"
                    id="blogTitle"
                    name="blogTitle"
                    placeholder="Enter your blog title"
                  />
                </Field>
              </div>

              <div className="mb-6">
                <Field label="" error={errors.tags}>
                  <input
                    {...register("tags", {
                      required: "Blog tags are Required",
                    })}
                    className={`${
                      errors.tags ? "border-red-500" : "border-gray-200"
                    }`}
                    type="text"
                    id="tags"
                    name="tags"
                    placeholder="Your Comma Separated Tags Ex. JavaScript, React, Node, Express"
                  />
                </Field>
              </div>

              <div className="mb-6">
                <Field label="" error={errors.content}>
                  <textarea
                    {...register("content", {
                      required: "Blog content is Required",
                    })}
                    className={`${
                      errors.content ? "border-red-500" : "border-gray-200"
                    }`}
                    id="content"
                    name="content"
                    rows="6"
                    placeholder="Write your blog content"
                  />
                </Field>
              </div>

              <input
                type="file"
                name="image"
                id="image"
                hidden
                ref={fileUploaderRef}
                onChange={handleImageUpload}
              />

              <button
                type="submit"
                className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
              >
                {blogEdit ? "Update Blog" : "Create Blog"}
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
