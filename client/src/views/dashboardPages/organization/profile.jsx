import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import server from "../../../helpers/apiCall";
import { useDispatch, useSelector } from "react-redux";
import { setOrganization, setUserOrganization } from "../../../store/actions/organizationActions";

const organizationValidationSchema = Yup.object({
  name: Yup.string().required("Organization name is required"),
  type: Yup.string()
    .required("Organization type is required")
    .oneOf(["Academic", "Research", "Corporate"], "Invalid type selected"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  website: Yup.string().url("Invalid URL format"),
  location: Yup.object({
    country: Yup.string().required("Country is required"),
    city: Yup.string(),
    address: Yup.string(),
  }),
  contactNumber: Yup.string().matches(
    /^[0-9]+$/,
    "Contact number must contain only digits"
  ),
  establishmentYear: Yup.number().min(1800, "Year is too old").max(new Date().getFullYear(), "Invalid establishment year"),
  registeredGovtId: Yup.string(),
  industry: Yup.string(),
});

const OrganizationForm = () => {
  const dispatch = useDispatch();
  const organization = useSelector((state) => state.organization); // Assuming organization state contains organization details
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmitOrganization = async (values, setErrors) => {
    setLoading(true);
    try {
      const response = await server.put(`/organization/update/${organization?._id}`, {
        organization: { ...values },
      });
      if (response.status >= 200 && response.status < 300) {
        toast.success(response?.data?.message || "Organization Updated Successfully");
        dispatch(setUserOrganization(response.data.data));
        setIsEditing(false);
      }
    } catch (err) {
      console.error("Error: ", err);
      toast.error("Failed to update organization");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!isEditing ? (
        <div className="flex items-center justify-between">
          <h1 className="text-2xl py-6">Organization</h1>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-transparent px-2 py-1 text-sm border border-primary rounded-lg text-primary"
          >
            Edit
          </button>
        </div>
      ) : (
        <Formik
          initialValues={{
            name: organization?.name || "",
            type: organization?.type || "",
            email: organization?.email || "",
            website: organization?.website || "",
            location: {
              country: organization?.location?.country || "",
              city: organization?.location?.city || "",
              address: organization?.location?.address || "",
            },
            contactNumber: organization?.contactNumber || "",
            establishmentYear: organization?.establishmentYear || "",
            registeredGovtId: organization?.registeredGovtId || "",
            industry: organization?.industry || "",
          }}
          validationSchema={organizationValidationSchema}
          onSubmit={(values, { setErrors }) => {
            handleSubmitOrganization(values, setErrors);
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
                    as="select"
                    id="type"
                    name="type"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  >
                    <option value="">Select Type</option>
                    <option value="Academic">Academic</option>
                    <option value="Research">Research</option>
                    <option value="Corporate">Corporate</option>
                  </Field>
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
                </div>
                <div className="form-group">
                  <label htmlFor="location.address">Address</label>
                  <Field
                    type="text"
                    id="location.address"
                    name="location.address"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
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
                  <label htmlFor="registeredGovtId">Registered Govt. ID</label>
                  <Field
                    type="text"
                    id="registeredGovtId"
                    name="registeredGovtId"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
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

export default OrganizationForm;
