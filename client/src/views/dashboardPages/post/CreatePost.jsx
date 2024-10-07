import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import server from "../../../helpers/apiCall";

// Validation schema for the post form
const postValidationSchema = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .min(5, "Title must be at least 5 characters"),
  content: Yup.string()
    .required("Content is required")
    .min(20, "Content must be at least 20 characters"),
  imageUrl: Yup.string().url("Must be a valid URL"),
});

const CreatePostForm = () => {
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form submission
  const handleCreatePost = async (values, { setSubmitting }) => {
    setLoading(true);
    setIsSubmitting(true);
    try {
      const response = await server.post("/posts/create", {
        title: values.title,
        content: values.content,
        imageUrl: values.imageUrl ? [values.imageUrl] : [],
      });

      if (response.status >= 200 && response.status < 300) {
        toast.success("Post created successfully");
        setSubmitting(false);
      }
    } catch (error) {
      toast.error("Error creating post. Please try again.");
      console.error("Error: ", error);
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="post-form">
      <h2 className="text-2xl py-6">Create a New Post</h2>
      <Formik
        initialValues={{
          title: "",
          content: "",
          imageUrl: "",
        }}
        validationSchema={postValidationSchema}
        onSubmit={handleCreatePost}
      >
        <Form>
          <div className="grid grid-cols-1 gap-4">
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <Field
                type="text"
                id="title"
                name="title"
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>
            <div className="form-group">
              <label htmlFor="content">Content</label>
              <Field
                as="textarea"
                id="content"
                name="content"
                rows="5"
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
              <ErrorMessage
                name="content"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>
            <div className="form-group">
              <label htmlFor="imageUrl">Image URL</label>
              <Field
                type="text"
                id="imageUrl"
                name="imageUrl"
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
              <ErrorMessage
                name="imageUrl"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>
          </div>
          <div className="flex justify-between items-center mt-6">
            <button
              type="reset"
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
            >
              Reset
            </button>
            <button
              type="submit"
              disabled={loading || isSubmitting}
              className="bg-primary text-white px-4 py-2 rounded-md"
            >
              {loading ? "Creating..." : "Create Post"}
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default CreatePostForm;
