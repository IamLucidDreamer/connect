import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import server from "../../../helpers/apiCall";
import { useDispatch, useSelector } from "react-redux";
import { setUserOrganization } from "../../../store/actions/organizationActions";
import { parseErrorMessage } from "../../../helpers/apiCallHerlper";

// Validation schema
const organizationValidationSchema = Yup.object({
  name: Yup.string().required("Organization Name is required"),
  type: Yup.string().required("Type is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  website: Yup.string().url("Invalid website URL"),
  contactNumber: Yup.string()
    .matches(/^[+0-9]+$/, "Contact number must be digits or start with '+'")
    .required("Contact Number is required"),
  establishmentYear: Yup.number()
    .min(1800, "Year must be later than 1800")
    .max(new Date().getFullYear(), "Year cannot be in the future")
    .required("Establishment Year is required"),
  registeredGovtId: Yup.string().required("Registered Govt ID is required"),
  industry: Yup.string().required("Industry is required"),
  location: Yup.object({
    country: Yup.string().required("Country is required"),
    city: Yup.string().required("City is required"),
  }),
  role: Yup.string().required("Role is required"),
  isApproved: Yup.boolean(),
});

const OrganizationUpdateForm = () => {
  const dispatch = useDispatch();
  const organizationData = useSelector((state) => state.organization);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdateOrganization = async (values, setErrors) => {
    setLoading(true);
    try {
      const response = await server.put(
        `/organization/update/${organizationData?._id}`,
        {
          organization: { ...values },
        }
      );
      if (response.status >= 200 && response.status < 300) {
        toast.success(
          response?.data?.message || "Organization Updated Successfully"
        );
        dispatch(setUserOrganization(response.data.data));
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
          <div className="flex items-center justify-between">
            <h1 className="text-2xl py-6">Organization Profile</h1>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-transparent px-2 py-1 text-sm border border-primary rounded-lg text-primary"
            >
              Edit
            </button>
          </div>
          <hr className="mb-6 border-t border-gray-300" />
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {organizationData?.name && (
              <div className="sm:col-span-3">
                <p className="text-gray-700 pb-1">Organization Name</p>
                <p className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                  {organizationData?.name}
                </p>
              </div>
            )}
            {organizationData?.type && (
              <div className="sm:col-span-3">
                <p className="text-gray-700 pb-1">Type</p>
                <p className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                  {organizationData?.type}
                </p>
              </div>
            )}
            {organizationData?.email && (
              <div className="sm:col-span-3">
                <p className="text-gray-700 pb-1">Email</p>
                <p className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                  {organizationData?.email}
                </p>
              </div>
            )}
            {organizationData?.website && (
              <div className="sm:col-span-3">
                <p className="text-gray-700 pb-1">Website</p>
                <p className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                  <a
                    href={organizationData?.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {organizationData?.website}
                  </a>
                </p>
              </div>
            )}
            {organizationData?.contactNumber && (
              <div className="sm:col-span-3">
                <p className="text-gray-700 pb-1">Contact Number</p>
                <p className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                  {organizationData?.contactNumber}
                </p>
              </div>
            )}
            {organizationData?.establishmentYear && (
              <div className="sm:col-span-3">
                <p className="text-gray-700 pb-1">Establishment Year</p>
                <p className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                  {organizationData?.establishmentYear}
                </p>
              </div>
            )}
            {organizationData?.registeredGovtId && (
              <div className="sm:col-span-3">
                <p className="text-gray-700 pb-1">Registered Govt ID</p>
                <p className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                  {organizationData?.registeredGovtId}
                </p>
              </div>
            )}
            {organizationData?.industry && (
              <div className="sm:col-span-3">
                <p className="text-gray-700 pb-1">Industry</p>
                <p className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                  {organizationData?.industry}
                </p>
              </div>
            )}
            {organizationData?.location?.country && (
              <div className="sm:col-span-3">
                <p className="text-gray-700 pb-1">Country</p>
                <p className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                  {organizationData?.location?.country}
                </p>
              </div>
            )}
            {organizationData?.location?.city && (
              <div className="sm:col-span-3">
                <p className="text-gray-700 pb-1">City</p>
                <p className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                  {organizationData?.location?.city}
                </p>
              </div>
            )}
            {organizationData?.role && (
              <div className="sm:col-span-3">
                <p className="text-gray-700 pb-1">Role</p>
                <p className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                  {organizationData?.role}
                </p>
              </div>
            )}
            <div className="sm:col-span-3">
              <p className="text-gray-700 pb-1">Approval Status</p>
              <p
                className={`${
                  organizationData?.isApproved ? "text-green-600" : "text-red-600"
                } bg-white border border-gray-300 text-sm rounded-lg block w-full p-2.5`}
              >
                {organizationData?.isApproved ? "Approved" : "Not Approved"}
              </p>
            </div>
          </div>
        </>
      ) : (
        <Formik
          initialValues={{
            name: organizationData?.name || "",
            type: organizationData?.type || "",
            email: organizationData?.email || "",
            website: organizationData?.website || "",
            contactNumber: organizationData?.contactNumber || "",
            establishmentYear: organizationData?.establishmentYear || "",
            registeredGovtId: organizationData?.registeredGovtId || "",
            industry: organizationData?.industry || "",
            location: {
              country: organizationData?.location?.country || "",
              city: organizationData?.location?.city || "",
            },
            role: organizationData?.role || "",
            isApproved: organizationData?.isApproved || false,
          }}
          validationSchema={organizationValidationSchema}
          onSubmit={(values, { setErrors }) => {
            handleUpdateOrganization(values, setErrors);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="form-group">
                  <label htmlFor="name">Organization Name</label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="type">Type</label>
                  <Field
                    type="text"
                    id="type"
                    name="type"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  />
                  <ErrorMessage
                    name="type"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="website">Website</label>
                  <Field
                    type="text"
                    id="website"
                    name="website"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  />
                  <ErrorMessage
                    name="website"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contactNumber">Contact Number</label>
                  <Field
                    type="text"
                    id="contactNumber"
                    name="contactNumber"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  />
                  <ErrorMessage
                    name="contactNumber"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="establishmentYear">Establishment Year</label>
                  <Field
                    type="number"
                    id="establishmentYear"
                    name="establishmentYear"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  />
                  <ErrorMessage
                    name="establishmentYear"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="registeredGovtId">Registered Govt ID</label>
                  <Field
                    type="text"
                    id="registeredGovtId"
                    name="registeredGovtId"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  />
                  <ErrorMessage
                    name="registeredGovtId"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="industry">Industry</label>
                  <Field
                    type="text"
                    id="industry"
                    name="industry"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  />
                  <ErrorMessage
                    name="industry"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="location.country">Country</label>
                  <Field
                    type="text"
                    id="location.country"
                    name="location.country"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  />
                  <ErrorMessage
                    name="location.country"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="location.city">City</label>
                  <Field
                    type="text"
                    id="location.city"
                    name="location.city"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  />
                  <ErrorMessage
                    name="location.city"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="role">Role</label>
                  <Field
                    as="select"
                    id="role"
                    name="role"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  >
                    <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="member">Member</option>
                  </Field>
                  <ErrorMessage
                    name="role"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>
                <div className="form-group flex items-center">
                  <Field
                    type="checkbox"
                    id="isApproved"
                    name="isApproved"
                    className="mr-2"
                  />
                  <label htmlFor="isApproved">Is Approved</label>
                  <ErrorMessage
                    name="isApproved"
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

export default OrganizationUpdateForm;
