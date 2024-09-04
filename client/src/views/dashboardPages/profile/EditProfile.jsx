import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import server from "../../../helpers/apiCall";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../store/actions/userActions";
import { parseErrorMessage } from "../../../helpers/apiCallHerlper";

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

  const handleUpdateProfile = async (values, setErrors) => {
    setLoading(true);
    try {
      const response = await server.put(`/user/update/${user?._id}`, {
        user: { values },
      });
      if (response.status >= 200 && response.status < 300) {
        toast.success(
          response?.data?.message || "Profile Updated Successfully"
        );
        dispatch(setUser(response.data.data));
      }
    } catch (err) {
      console.error("Error : ", err);
      toast.error(parseErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-2xl py-6">Update Profile</h1>
      <Formik
        initialValues={{
          firstName: user.firstName || "",
          middleName: user.middleName || "",
          lastName: user.lastName || "",
          gender: user.gender || "",
          dateOfBirth: user.dateOfBirth || "",
          mobileNumber: user.mobileNumber || "",
          bio: user.bio || "",
          address: {
            street: user.address?.street || "",
            city: user.address?.city || "",
            state: user.address?.state || "",
            country: user.address?.country || "",
            postalCode: user.address?.postalCode || "",
          },
          socialLinks: {
            linkedin: user.socialLinks?.linkedin || "",
            twitter: user.socialLinks?.twitter || "",
            github: user.socialLinks?.github || "",
          },
        }}
        validationSchema={profileValidationSchema}
        onSubmit={(values, { setErrors }) => {
          handleUpdateProfile(values, setErrors);
        }}
        enableReinitialize={true}
      >
        {({ values, handleChange, handleSubmit, resetForm }) => (
          <Form className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 pb-8">
            {/* Personal Information */}
            <div className="sm:col-span-4">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium leading-6 text-gray-500"
              >
                First Name
              </label>
              <div className="mt-1">
                <Field
                  type="text"
                  name="firstName"
                  class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Enter your first name"
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="middleName"
                className="block text-sm font-medium leading-6 text-gray-500"
              >
                Middle Name
              </label>
              <div className="mt-2">
                <Field
                  type="text"
                  name="middleName"
                  class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Enter your middle name"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium leading-6 text-gray-500"
              >
                Last Name
              </label>
              <div className="mt-2">
                <Field
                  type="text"
                  name="lastName"
                  class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Enter your last name"
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="gender"
                className="block text-sm font-medium leading-6 text-gray-500"
              >
                Gender
              </label>
              <div className="mt-2">
                <Field
                  as="select"
                  name="gender"
                  class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                >
                  <option value="" disabled>
                    Select Gender
                  </option>
                  {[
                    "Male",
                    "Female",
                    "Non-binary",
                    "Other",
                    "Prefer not to say",
                  ].map((value) => (
                    <option value={value}>{value}</option>
                  ))}
                </Field>
                <ErrorMessage
                  name="gender"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="dateOfBirth"
                className="block text-sm font-medium leading-6 text-gray-500"
              >
                Date of Birth
              </label>
              <div className="mt-2">
                <Field
                  type="date"
                  name="dateOfBirth"
                  value={values.dateOfBirth.split("T")[0]}
                  class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
                <ErrorMessage
                  name="dateOfBirth"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="mobileNumber"
                className="block text-sm font-medium leading-6 text-gray-500"
              >
                Mobile Number
              </label>
              <div className="mt-2">
                <Field
                  type="text"
                  name="mobileNumber"
                  class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Enter your mobile number"
                />
                <ErrorMessage
                  name="mobileNumber"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="bio"
                className="block text-sm font-medium leading-6 text-gray-500"
              >
                Bio
              </label>
              <div className="mt-2">
                <Field
                  as="textarea"
                  name="bio"
                  class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Tell us about yourself"
                  rows="3"
                />
                <ErrorMessage
                  name="bio"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>
            </div>

            {/* Address Information */}
            <div className="sm:col-span-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Address Information
              </h3>
              {["street", "city", "state", "country", "postalCode"].map(
                (field) => (
                  <div className="mt-4" key={field}>
                    <label
                      htmlFor={`address.${field}`}
                      className="block text-sm font-medium leading-6 text-gray-500"
                    >
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    <div className="mt-2">
                      <Field
                        type="text"
                        name={`address.${field}`}
                        class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder={`Enter ${field}`}
                      />
                    </div>
                  </div>
                )
              )}
            </div>

            {/* Social Links */}
            <div className="sm:col-span-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Social Links
              </h3>
              {["linkedin", "twitter", "github"].map((platform) => (
                <div className="mt-4" key={platform}>
                  <label
                    htmlFor={`socialLinks.${platform}`}
                    className="block text-sm font-medium leading-6 text-gray-500"
                  >
                    {platform.charAt(0).toUpperCase() + platform.slice(1)} URL
                  </label>
                  <div className="mt-2">
                    <Field
                      type="url"
                      name={`socialLinks.${platform}`}
                      class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder={`Enter ${platform} URL`}
                    />
                    <ErrorMessage
                      name={`socialLinks.${platform}`}
                      component="div"
                      className="text-red-600 text-sm mt-1"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="sm:col-span-full">
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white rounded-md mx-auto"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Update Profile"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ProfileUpdateForm;
