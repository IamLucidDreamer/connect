import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import server from "../../../helpers/apiCall";
import { useSelector } from "react-redux";

const EducationForm = () => {
  const userId = useSelector((state) => state?.user?._id);
  const [educationList, setEducationList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editEducationId, setEditEducationId] = useState(null);

  // State for form initial values
  const [formInitialValues, setFormInitialValues] = useState({
    qualification: "",
    program: "",
    specialization: "",
    programType: "",
    university: "",
    institute: "",
    startYear: "",
    completionYear: "",
    percentageOrCGPA: "",
  });

  const validationSchema = Yup.object({
    qualification: Yup.string().required("Qualification is required"),
    program: Yup.string().required("Program is required"),
    specialization: Yup.string().required("Specialization is required"),
    programType: Yup.string()
      .oneOf(["regular", "parttime"], "Invalid Program Type")
      .required("Program Type is required"),
    university: Yup.string().required("University/Board is required"),
    institute: Yup.string().required("Institute/School/College is required"),
    startDate: Yup.date()
      .required("Start Date is required")
      .min(new Date(1900, 0, 1), "Invalid Start Date")
      .max(new Date(), "Start Date cannot be in the future"),
    completionDate: Yup.date()
      .required("Completion Date is required")
      .min(Yup.ref("startDate"), "Completion Date cannot be before Start Date")
      .max(new Date(), "Completion Date cannot be in the future"),
    percentageOrCGPA: Yup.number()
      .min(0, "Percentage/CGPA cannot be less than 0")
      .max(100, "Percentage cannot exceed 100"), // Assuming a max limit of 100 for percentage
  });

  useEffect(() => {
    fetchEducation();
  }, []);

  const fetchEducation = async () => {
    try {
      const response = await server.get(`/user/education/${userId}`);
      setEducationList(response?.data?.data);
    } catch (error) {
      toast.error("Error fetching education details");
    }
  };

  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true);
    try {
      if (isEditMode) {
        const response = await server.put("/user/education", {
          educationId: editEducationId,
          education: values,
        });
        toast.success(response.data.message);
      } else {
        const response = await server.post("/user/education", {
          education: values,
        });
        toast.success(response.data.message);
      }

      resetForm();
      setIsEditMode(false);
      setEditEducationId(null);
      fetchEducation();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error submitting education"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (education) => {
    setIsEditMode(true);
    setEditEducationId(education._id);
    setFormInitialValues({
      qualification: education.qualification,
      program: education.program,
      specialization: education.specialization,
      programType: education.programType,
      university: education.university,
      institute: education.institute,
      startYear: education.startYear,
      completionYear: education.completionYear,
      percentageOrCGPA: education.percentageOrCGPA || "",
    });
  };

  const handleDelete = async (educationId) => {
    if (
      window.confirm("Are you sure you want to delete this education record?")
    ) {
      setLoading(true);
      try {
        const response = await server.delete("/user/education", {
          data: { educationId },
        });
        toast.success(response.data.message);
        fetchEducation();
      } catch (error) {
        toast.error("Error deleting education record");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <h1 className="text-2xl py-4 font-semibold">Educational Details</h1>
      <Formik
        initialValues={formInitialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {() => (
          <Form className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="qualification"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Qualification
              </label>
              <div className="mt-2">
                <Field
                  type="text"
                  name="qualification"
                  className="block w-full border-gray-300 rounded-lg p-1"
                  placeholder="Enter your qualification"
                />
                <ErrorMessage
                  name="qualification"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="program"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Program
              </label>
              <div className="mt-2">
                <Field
                  type="text"
                  name="program"
                  className="block w-full border-gray-300 rounded-lg p-1"
                  placeholder="Enter your program"
                />
                <ErrorMessage
                  name="program"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="specialization"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Specialization
              </label>
              <div className="mt-2">
                <Field
                  type="text"
                  name="specialization"
                  className="block w-full border-gray-300 rounded-lg p-1"
                  placeholder="Enter your specialization"
                />
                <ErrorMessage
                  name="specialization"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="programType"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Program Type
              </label>
              <div className="mt-2">
                <Field
                  as="select"
                  name="programType"
                  className="block w-full border-gray-300 rounded-lg p-1"
                >
                  <option value="">Select Program Type</option>
                  <option value="regular">Regular</option>
                  <option value="parttime">Part-time</option>
                </Field>
                <ErrorMessage
                  name="programType"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="university"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                University/Board
              </label>
              <div className="mt-2">
                <Field
                  type="text"
                  name="university"
                  className="block w-full border-gray-300 rounded-lg p-1"
                  placeholder="Enter your university/board"
                />
                <ErrorMessage
                  name="university"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="institute"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Institute/School/College
              </label>
              <div className="mt-2">
                <Field
                  type="text"
                  name="institute"
                  className="block w-full border-gray-300 rounded-lg p-1"
                  placeholder="Enter your institute/school/college"
                />
                <ErrorMessage
                  name="institute"
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
                htmlFor="percentageOrCGPA"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Percentage/CGPA
              </label>
              <div className="mt-2">
                <Field
                  type="number"
                  name="percentageOrCGPA"
                  className="block w-full border-gray-300 rounded-lg p-1"
                  placeholder="Enter percentage or CGPA"
                />
                <ErrorMessage
                  name="percentageOrCGPA"
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
        Education History
      </h3>
      {educationList.length === 0 ? (
        <p className="text-gray-700">No Education history found</p>
      ) : (
        <ul className="mt-4">
          {educationList.map((edu) => (
            <li key={edu._id} className="mb-4">
              <p className="text-gray-700">
                <strong>{edu.qualification}</strong> - {edu.program} in{" "}
                {edu.specialization}
                <br />
                {edu.startYear} to {edu.completionYear || "Present"}
                <br />
                University/Board: {edu.university}, Institute: {edu.institute}
                <br />
                Percentage/CGPA: {edu.percentageOrCGPA}
              </p>
              <div className="mt-2 flex space-x-2">
                <button
                  onClick={() => handleEdit(edu)}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(edu._id)}
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

export default EducationForm;
