import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import server from "../../../helpers/apiCall";
import { useSelector } from "react-redux";

const ProfessionalForm = () => {
  const userId = useSelector((state) => state?.user?._id);
  const [professionalList, setProfessionalList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editProfessionalId, setEditProfessionalId] = useState(null);

  // State for form initial values
  const [formInitialValues, setFormInitialValues] = useState({
    currentEmployment: "",
    employmentType: "",
    companyName: "",
    designation: "",
    location: "",
    startYear: "",
    completionYear: "",
    salaryBand: "",
  });

  const validationSchema = Yup.object({
    currentEmployment: Yup.string().required("Current Employment is required"),
    employmentType: Yup.string()
      .oneOf(
        ["Regular", "Freelancer", "Contract", "Parttime"],
        "Invalid Employment Type"
      )
      .required("Employment Type is required"),
    companyName: Yup.string().required("Company Name is required"),
    designation: Yup.string().required("Designation is required"),
    location: Yup.string().required("Location is required"),
    startDate: Yup.date()
      .required("Start Date is required")
      .min(new Date(1900, 0, 1), "Invalid Start Date")
      .max(new Date(), "Start Date cannot be in the future"),
    completionDate: Yup.date()
      .required("Completion Date is required")
      .min(Yup.ref("startDate"), "Completion Date cannot be before Start Date")
      .max(new Date(), "Completion Date cannot be in the future")
      .nullable(),
    salaryBand: Yup.string(), // Optional field
  });

  useEffect(() => {
    fetchProfessionalDetails();
  }, []);

  const fetchProfessionalDetails = async () => {
    try {
      const response = await server.get(`/user/professional/${userId}`);
      setProfessionalList(response?.data?.data);
    } catch (error) {
      toast.error("Error fetching professional details");
    }
  };

  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true);
    try {
      if (isEditMode) {
        const response = await server.put("/user/professional", {
          professionalId: editProfessionalId,
          professional: values,
        });
        toast.success(response.data.message);
      } else {
        const response = await server.post("/user/professional", {
          professional: values,
        });
        toast.success(response.data.message);
      }

      resetForm();
      setIsEditMode(false);
      setEditProfessionalId(null);
      fetchProfessionalDetails();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error submitting professional details"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (professional) => {
    setIsEditMode(true);
    setEditProfessionalId(professional._id);
    setFormInitialValues({
      currentEmployment: professional.currentEmployment,
      employmentType: professional.employmentType,
      companyName: professional.companyName,
      designation: professional.designation,
      location: professional.location,
      startYear: professional.startYear,
      completionYear: professional.completionYear || "",
      salaryBand: professional.salaryBand || "",
    });
  };

  const handleDelete = async (professionalId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this professional record?"
      )
    ) {
      setLoading(true);
      try {
        const response = await server.delete("/user/professional", {
          data: { professionalId },
        });
        toast.success(response.data.message);
        fetchProfessionalDetails();
      } catch (error) {
        toast.error("Error deleting professional record");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <h1 className="text-2xl py-4 font-semibold">Professional Details</h1>
      <Formik
        initialValues={formInitialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({ values, handleChange, handleSubmit, resetForm }) => (
          <Form className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="currentEmployment"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Current Employment
              </label>
              <div className="mt-2">
                <Field
                  type="text"
                  name="currentEmployment"
                  className="block w-full border-gray-300 rounded-lg p-1"
                  placeholder="Enter your current employment"
                />
                <ErrorMessage
                  name="currentEmployment"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="employmentType"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Employment Type
              </label>
              <div className="mt-2">
                <Field
                  as="select"
                  name="employmentType"
                  className="block w-full border-gray-300 rounded-lg p-1"
                >
                  <option value="">Select Employment Type</option>
                  <option value="Regular">Regular</option>
                  <option value="Freelancer">Freelancer</option>
                  <option value="Contract">Contract</option>
                  <option value="Parttime">Part-time</option>
                </Field>
                <ErrorMessage
                  name="employmentType"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="companyName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Company Name
              </label>
              <div className="mt-2">
                <Field
                  type="text"
                  name="companyName"
                  className="block w-full border-gray-300 rounded-lg p-1"
                  placeholder="Enter your company name"
                />
                <ErrorMessage
                  name="companyName"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="designation"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Designation
              </label>
              <div className="mt-2">
                <Field
                  type="text"
                  name="designation"
                  className="block w-full border-gray-300 rounded-lg p-1"
                  placeholder="Enter your designation"
                />
                <ErrorMessage
                  name="designation"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="location"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Location
              </label>
              <div className="mt-2">
                <Field
                  type="text"
                  name="location"
                  className="block w-full border-gray-300 rounded-lg p-1"
                  placeholder="Enter your location"
                />
                <ErrorMessage
                  name="location"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="startYear"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Start Year
              </label>
              <div className="mt-2">
                <Field
                  type="month"
                  name="startYear"
                  className="block w-full border-gray-300 rounded-lg p-1"
                  placeholder="Enter start year"
                />
                <ErrorMessage
                  name="startYear"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="completionYear"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Completion Year
              </label>
              <div className="mt-2">
                <Field
                  type="month"
                  name="completionYear"
                  className="block w-full border-gray-300 rounded-lg p-1"
                  placeholder="Enter completion year"
                />
                <ErrorMessage
                  name="completionYear"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="salaryBand"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Salary Band
              </label>
              <div className="mt-2">
                <Field
                  as="select"
                  name="salaryBand"
                  className="block w-full border-gray-300 rounded-lg p-1"
                >
                  <option value="" disabled>
                    Select Salary Band (Optional) Your data is secured and not
                    shared with anyone
                  </option>
                  <option value="0-5 LPA">0-5 LPA</option>
                  <option value="5-10 LPA">5-10 LPA</option>
                  <option value="10-15 LPA">10-15 LPA</option>
                  <option value="15-20 LPA">15-20 LPA</option>
                  <option value="20-25 LPA">20-25 LPA</option>
                  <option value="25-30 LPA">25-30 LPA</option>
                  <option value="30-35 LPA">30-35 LPA</option>
                  <option value="35-40 LPA">35-40 LPA</option>
                  <option value="40-45 LPA">40-45 LPA</option>
                  <option value="45-50 LPA">45-50 LPA</option>
                  <option value="50+ LPA">50+ LPA</option>
                </Field>
                <ErrorMessage
                  name="salaryBand"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>
            </div>

            <div className="sm:col-span-full">
              <button
                type="submit"
                className="mt-4 inline-flex justify-center rounded-md bg-indigo-600 py-2 px-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                disabled={loading}
              >
                {loading ? "Submitting..." : isEditMode ? "Update" : "Submit"}
              </button>
            </div>
          </Form>
        )}
      </Formik>

      <hr className="my-6 border-t border-gray-300" />

      <h3 className="text-lg font-medium leading-6 text-gray-900">
        Professional History
      </h3>
      {professionalList.length === 0 ? (
        <p className="text-gray-700">No professional history found</p>
      ) : (
        <ul className="mt-4">
          {professionalList.map((prof) => (
            <li key={prof._id} className="mb-4">
              <p className="text-gray-700">
                <strong>{prof.currentEmployment}</strong> - {prof.designation}{" "}
                at {prof.companyName}
                <br />
                {prof.startYear} to {prof.completionYear || "Present"}
                <br />
                Employment Type: {prof.employmentType}, Location:{" "}
                {prof.location}
                <br />
                Salary Band: {prof.salaryBand || "N/A"}
              </p>
              <div className="mt-2 flex space-x-2">
                <button
                  onClick={() => handleEdit(prof)}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(prof._id)}
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default ProfessionalForm;
