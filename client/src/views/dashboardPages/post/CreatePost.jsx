import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import server from "../../../helpers/apiCall";
import { useParams } from "react-router-dom";
import { getPostDetails } from "../../../services/postService";
import { getPresignedUrl, uploadFileToS3 } from "../../../services/awsService";

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
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    imageUrl: "",
  });
  const { postId: postIdFromParams } = useParams();

  const getPostData = async () => {
    try {
      const response = await getPostDetails(postIdFromParams);
      if (response && response.data) {
        const { title, content, imageUrl } = response.data.data;
        setPostData({ title, content, imageUrl });
      }
    } catch (error) {
      console.error("Error getting post data: ", error);
    }
  };

  useEffect(() => {
    if (postIdFromParams) {
      getPostData();
    }
  }, [postIdFromParams]);

  // Handle file upload
  const handleFileUpload = async (e, setFieldValue) => {
    const file = e.target.files[0];
    if (file) {
      try {
        // Step 1: Get the presigned URL
        const preSignedUrl = await getPresignedUrl(file);

        // Step 2: Upload the file to S3 using the presigned URL
        if (preSignedUrl) {
          const uploadResponse = await uploadFileToS3(preSignedUrl, file);

          if (uploadResponse.status >= 200 && uploadResponse.status < 300) {
            toast.success("Image uploaded successfully");

            // Step 3: Update the form's imageUrl field with the uploaded file URL
            const uploadedImageUrl = preSignedUrl.split('?')[0]; // This gives the actual S3 file URL
            setFieldValue('imageUrl', uploadedImageUrl); // Set the imageUrl field value
          }
        }
      } catch (error) {
        console.log(error);
        toast.error("Error uploading image");
      }
    }
  };

  const handleCreatePost = async (values, { setSubmitting, resetForm }) => {
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
        resetForm();  // Reset form after successful creation
      }
    } catch (error) {
      toast.error("Error creating post. Please try again.");
      console.error("Error: ", error);
    } finally {
      setLoading(false);
      setIsSubmitting(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="post-form">
      <h2 className="text-2xl py-6">
        {postIdFromParams ? "Edit Post" : "Create a New Post"}
      </h2>
      <Formik
        initialValues={postData}
        enableReinitialize={true} // Ensures form is reinitialized when postData changes
        validationSchema={postValidationSchema}
        onSubmit={handleCreatePost}
      >
        {({ setFieldValue, isSubmitting, resetForm }) => (
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
                <label htmlFor="imageUrl">Image</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                  onChange={(e) => handleFileUpload(e, setFieldValue)} // Handle file upload
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
                onClick={() => resetForm()}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
              >
                Reset
              </button>
              <button
                type="submit"
                disabled={loading || isSubmitting}
                className="bg-primary text-white px-4 py-2 rounded-md"
              >
                {loading ? "Submitting..." : postIdFromParams ? "Update Post" : "Create Post"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreatePostForm;
