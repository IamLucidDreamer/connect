import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import server from "../../../helpers/apiCall";
import { useSelector } from "react-redux";
import formatDateToMonthYear from "../../../helpers";

const ProfessionalDetailsAndForm = () => {
  const userId = useSelector((state) => state?.user?._id);
  const [professionalList, setProfessionalList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editProfessionalId, setEditProfessionalId] = useState(null);
  const [formVisible, setFormVisible] = useState(false);

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
    startYear: Yup.date()
      .required("Start Date is required")
      .min(new Date(1900, 0, 1), "Invalid Start Date")
      .max(new Date(), "Start Date cannot be in the future"),
    completionYear: Yup.date()
      .min(Yup.ref("startYear"), "Completion Date cannot be before Start Date")
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
      setFormVisible(false);
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
    setFormVisible(true);
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
      {/* Professional Records */}
      {professionalList.length > 0 && (
  <div className="mb-6">
    {professionalList.map((professional) => (
      <div
        key={professional._id}
        className="mb-4 border p-4 rounded-md shadow-md grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
      >
        <div className="sm:col-span-3">
          <label className="block text-sm font-medium leading-6 text-gray-500">
            Company Name
          </label>
          <p className="mt-2 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5">
            {professional.companyName}
          </p>
        </div>

        <div className="sm:col-span-3">
          <label className="block text-sm font-medium leading-6 text-gray-500">
            Current Employment
          </label>
          <p className="mt-2 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5">
            {professional.currentEmployment}
          </p>
        </div>

        <div className="sm:col-span-3">
          <label className="block text-sm font-medium leading-6 text-gray-500">
            Employment Type
          </label>
          <p className="mt-2 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5">
            {professional.employmentType}
          </p>
        </div>

        <div className="sm:col-span-3">
          <label className="block text-sm font-medium leading-6 text-gray-500">
            Designation
          </label>
          <p className="mt-2 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5">
            {professional.designation}
          </p>
        </div>

        <div className="sm:col-span-3">
          <label className="block text-sm font-medium leading-6 text-gray-500">
            Location
          </label>
          <p className="mt-2 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5">
            {professional.location}
          </p>
        </div>

        <div className="sm:col-span-3">
          <label className="block text-sm font-medium leading-6 text-gray-500">
            Start Year
          </label>
          <p className="mt-2 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5">
            {formatDateToMonthYear(professional.startYear)}
          </p>
        </div>

        {professional.completionYear && (
          <div className="sm:col-span-3">
            <label className="block text-sm font-medium leading-6 text-gray-500">
              Completion Year
            </label>
            <p className="mt-2 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5">
              {formatDateToMonthYear(professional.completionYear)}
            </p>
          </div>
        )}

        {professional.salaryBand && (
          <div className="sm:col-span-3">
            <label className="block text-sm font-medium leading-6 text-gray-500">
              Salary Band
            </label>
            <p className="mt-2 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5">
              {professional.salaryBand}
            </p>
          </div>
        )}

        <div className="sm:col-span-6 mt-4 flex gap-2">
          <button
            onClick={() => handleEdit(professional)}
            className="text-blue-500 hover:underline"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(professional._id)}
            className="text-red-500 hover:underline"
          >
            Delete
          </button>
        </div>
      </div>
    ))}
  </div>
)}


      {/* Add/Edit Form */}
      <button
        onClick={() => {
          setIsEditMode(false);
          setFormInitialValues({
            currentEmployment: "",
            employmentType: "",
            companyName: "",
            designation: "",
            location: "",
            startYear: "",
            completionYear: "",
            salaryBand: "",
          });
          setFormVisible(true);
        }}
        className="mb-4 inline-flex items-center px-4 py-2 bg-primary text-white text-sm font-medium rounded-md shadow-sm hover:bg-blue-600"
      >
        Add Professional Details
      </button>

      {formVisible && (
        <Formik
          initialValues={formInitialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {({ values, handleChange, handleSubmit, resetForm }) => (
            <Form className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="currentEmployment"
                  className="block text-sm font-medium leading-6 text-gray-500"
                >
                  Current Employment
                </label>
                <div className="mt-2">
                  <Field
                    type="text"
                    name="currentEmployment"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Enter your current employment"
                  />
                  <ErrorMessage
                    name="currentEmployment"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="employmentType"
                  className="block text-sm font-medium leading-6 text-gray-500"
                >
                  Employment Type
                </label>
                <div className="mt-2">
                  <Field
                    as="select"
                    name="employmentType"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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

              <div className="sm:col-span-3">
                <label
                  htmlFor="companyName"
                  className="block text-sm font-medium leading-6 text-gray-500"
                >
                  Company Name
                </label>
                <div className="mt-2">
                  <Field
                    type="text"
                    name="companyName"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Enter your company name"
                  />
                  <ErrorMessage
                    name="companyName"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="designation"
                  className="block text-sm font-medium leading-6 text-gray-500"
                >
                  Designation
                </label>
                <div className="mt-2">
                  <Field
                    type="text"
                    name="designation"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Enter your designation"
                  />
                  <ErrorMessage
                    name="designation"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="location"
                  className="block text-sm font-medium leading-6 text-gray-500"
                >
                  Location
                </label>
                <div className="mt-2">
                  <Field
                    type="text"
                    name="location"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Enter your location"
                  />
                  <ErrorMessage
                    name="location"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="startYear"
                  className="block text-sm font-medium leading-6 text-gray-500"
                >
                  Start Year
                </label>
                <div className="mt-2">
                  <Field
                    type="month"
                    name="startYear"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                  <ErrorMessage
                    name="startYear"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="completionYear"
                  className="block text-sm font-medium leading-6 text-gray-500"
                >
                  Completion Year (Optional)
                </label>
                <div className="mt-2">
                  <Field
                    type="month"
                    name="completionYear"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                  <ErrorMessage
                    name="completionYear"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="salaryBand"
                  className="block text-sm font-medium leading-6 text-gray-500"
                >
                  Salary Band (Optional)
                </label>
                <div className="mt-2">
                  <Field
                    type="text"
                    name="salaryBand"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Enter your salary band"
                  />
                  <ErrorMessage
                    name="salaryBand"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>
              </div>

              <div className="sm:col-span-6 mt-4 flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md shadow-sm hover:bg-blue-600"
                >
                  {isEditMode ? "Update" : "Submit"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFormVisible(false);
                    resetForm();
                    setIsEditMode(false);
                    setEditProfessionalId(null);
                  }}
                  className="inline-flex items-center px-4 py-2 bg-gray-300 text-black text-sm font-medium rounded-md shadow-sm hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default ProfessionalDetailsAndForm;
