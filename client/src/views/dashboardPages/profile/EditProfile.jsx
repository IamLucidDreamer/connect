import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import server from "../../../helpers/apiCall";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../store/actions/userActions";
import { parseErrorMessage } from "../../../helpers/apiCallHerlper";

// Validation schema
const profileValidationSchema = Yup.object({
  firstName: Yup.string()
    .required("First Name is required")
    .min(2, "First Name must be at least 2 characters"),
  middleName: Yup.string(),
  lastName: Yup.string()
    .required("Last Name is required")
    .min(2, "Last Name must be at least 2 characters"),
  gender: Yup.string().required("Gender is required"),
  dateOfBirth: Yup.date().required("Date of Birth is required"),
  mobileNumber: Yup.string()
    .matches(/^[0-9]+$/, "Mobile number must be only digits")
    .min(10, "Mobile number must be at least 10 digits")
    .max(15, "Mobile number cannot exceed 15 digits"),
  bio: Yup.string().max(500, "Bio cannot exceed 500 characters"),
  address: Yup.object({
    street: Yup.string(),
    city: Yup.string(),
    state: Yup.string(),
    country: Yup.string(),
    postalCode: Yup.string(),
  }),
  socialLinks: Yup.object({
    linkedin: Yup.string().url("Invalid LinkedIn URL"),
    twitter: Yup.string().url("Invalid Twitter URL"),
    github: Yup.string().url("Invalid GitHub URL"),
  }),
});

const ProfileUpdateForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user); // Assuming user state contains user profile details
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // State to toggle between view and edit

  const handleUpdateProfile = async (values, setErrors) => {
    setLoading(true);
    try {
      if (values.mobileNumber === "") {
        delete values.mobileNumber;
      }
      console.log(values);
      const response = await server.put(`/user/update/${user?._id}`, {
        user: { ...values },
      });
      if (response.status >= 200 && response.status < 300) {
        toast.success(
          response?.data?.message || "Profile Updated Successfully"
        );
        dispatch(setUser(response.data.data));
        setIsEditing(false);
      }
    } catch (err) {
      console.error("Error: ", err);
      toast.error(parseErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!isEditing ? (
        <>
          <h1 className="text-2xl py-6">Profile</h1>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold mt-6 mb-4">About</h2>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-transparent px-2 py-1 text-sm border border-primary rounded-lg text-primary"
            >
              Edit
            </button>
          </div>
          {user?.bio ? (
            <p className="text-gray-700">{user?.bio}</p>
          ) : (
            <button
              className="px-4 py-2 bg-primary text-white rounded-md mx-auto"
              onClick={() => setIsEditing(true)}
            >
              Add Bio
            </button>
          )}
          <hr className="my-6 border-t border-gray-300" />
          <h2 className="text-xl font-semibold mt-6 mb-4">Personal Info</h2>
          {user?.gender && (
            <p className="text-gray-700">Gender: {user?.gender}</p>
          )}
          {user?.dateOfBirth && (
            <p className="text-gray-700">
              D.O.B: {user?.dateOfBirth.split("T")[0]}
            </p>
          )}
          {user?.socialLinks?.linkedin ||
            user?.socialLinks?.twitter ||
            user?.socialLinks?.github ? 
              <h3 className="font-semibold text-center mt-3 -mb-2">
                Find me on
              </h3>
              : null
            }
          <div className="flex justify-center items-center gap-6 my-6">
            {user?.socialLinks?.linkedin && (
              <a
                className="text-gray-700 hover:text-orange-600"
                aria-label="Visit LinkedIn"
                href={user.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* LinkedIn SVG */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="h-6"
                >
                  <path
                    fill="currentColor"
                    d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"
                  ></path>
                </svg>
              </a>
            )}
            {user?.socialLinks?.twitter && (
              <a
                className="text-gray-700 hover:text-orange-600"
                aria-label="Visit Twitter"
                href={user.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* Twitter SVG */}
                <svg
                  className="h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
                  ></path>
                </svg>
              </a>
            )}
            {user?.socialLinks?.github && (
              <a
                className="text-gray-700 hover:text-orange-600"
                aria-label="Visit GitHub"
                href={user.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* GitHub SVG */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="h-6"
                >
                  <path
                    fill="currentColor"
                    d="M256 0C114.6 0 0 114.6 0 256c0 113.4 73.1 209.3 174.2 242.3 12.7 2.3 17.4-5.5 17.4-12.3v-42.2c-70.5 15.4-85.5-31.1-85.5-31.1-11.5-29.2-28.1-37-28.1-37-23-15.7 1.7-15.4 1.7-15.4 25.5 1.8 38.7 26.1 38.7 26.1 22.7 38.7 59.7 27.6 74.2 21.1 2.3-16.4 8.9-27.6 16.2-34-56.8-6.5-116.7-28.4-116.7-126.4 0-27.9 10.1-50.8 26.7-68.6-2.7-6.5-11.6-32.8 2.6-68.2 0 0 21.4-6.8 70.3 25.9 20.4-5.7 42.2-8.5 63.7-8.5 21.4 0 43.3 2.9 63.7 8.5 48.8-32.7 70.1-25.9 70.1-25.9 14.3 35.5 5.4 61.8 2.6 68.2 16.5 17.7 26.7 40.7 26.7 68.6 0 98.3-59.9 119.9-116.9 126.2 9.2 7.9 17.4 23.4 17.4 47.1v69.5c0 6.8 4.7 14.8 17.4 12.3C438.9 465.3 512 369.4 512 256 512 114.6 397.4 0 256 0z"
                  ></path>
                </svg>
              </a>
            )}
          </div>
        </>
      ) : (
        <Formik
          initialValues={{
            firstName: user?.firstName || "",
            middleName: user?.middleName || "",
            lastName: user?.lastName || "",
            gender: user?.gender || "",
            dateOfBirth: user?.dateOfBirth?.split("T")[0] || "",
            mobileNumber: user?.mobileNumber || "",
            bio: user?.bio || "",
            address: {
              street: user?.address?.street || "",
              city: user?.address?.city || "",
              state: user?.address?.state || "",
              country: user?.address?.country || "",
              postalCode: user?.address?.postalCode || "",
            },
            socialLinks: {
              linkedin: user?.socialLinks?.linkedin || "",
              twitter: user?.socialLinks?.twitter || "",
              github: user?.socialLinks?.github || "",
            },
          }}
          validationSchema={profileValidationSchema}
          onSubmit={(values, { setErrors }) => {
            handleUpdateProfile(values, setErrors);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <Field
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="middleName">Middle Name</label>
                  <Field
                    type="text"
                    id="middleName"
                    name="middleName"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                  <ErrorMessage
                    name="middleName"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <Field
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="gender">Gender</label>
                  <Field
                    as="select"
                    id="gender"
                    name="gender"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </Field>
                  <ErrorMessage
                    name="gender"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="dateOfBirth">Date of Birth</label>
                  <Field
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                  <ErrorMessage
                    name="dateOfBirth"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="mobileNumber">Mobile Number</label>
                  <Field
                    type="text"
                    id="mobileNumber"
                    name="mobileNumber"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                  <ErrorMessage
                    name="mobileNumber"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="bio">Bio</label>
                  <Field
                    as="textarea"
                    id="bio"
                    name="bio"
                    rows="4"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                  <ErrorMessage
                    name="bio"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address.street">Street</label>
                  <Field
                    type="text"
                    id="address.street"
                    name="address.street"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address.city">City</label>
                  <Field
                    type="text"
                    id="address.city"
                    name="address.city"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address.state">State</label>
                  <Field
                    type="text"
                    id="address.state"
                    name="address.state"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address.country">Country</label>
                  <Field
                    type="text"
                    id="address.country"
                    name="address.country"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address.postalCode">Postal Code</label>
                  <Field
                    type="text"
                    id="address.postalCode"
                    name="address.postalCode"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="socialLinks.linkedin">LinkedIn</label>
                  <Field
                    type="text"
                    id="socialLinks.linkedin"
                    name="socialLinks.linkedin"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                  <ErrorMessage
                    name="socialLinks.linkedin"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="socialLinks.twitter">Twitter</label>
                  <Field
                    type="text"
                    id="socialLinks.twitter"
                    name="socialLinks.twitter"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                  <ErrorMessage
                    name="socialLinks.twitter"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="socialLinks.github">GitHub</label>
                  <Field
                    type="text"
                    id="socialLinks.github"
                    name="socialLinks.github"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                  <ErrorMessage
                    name="socialLinks.github"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>
              </div>
              <div className="flex justify-between items-center mt-6">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || loading}
                  className="bg-primary text-white px-4 py-2 rounded-md"
                >
                  {loading ? "Updating..." : "Update"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default ProfileUpdateForm;
