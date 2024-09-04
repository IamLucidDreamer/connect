import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import server from "../../../helpers/apiCall";
import { useSelector } from "react-redux";
import formatDateToMonthYear from "../../../helpers";

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
    startYear: Yup.date()
      .required("Start Date is required")
      .min(new Date(1900, 0, 1), "Invalid Start Date")
      .max(new Date(), "Start Date cannot be in the future"),
    completionYear: Yup.date()
      .min(Yup.ref("startYear"), "Completion Date cannot be before Start Date")
      .max(new Date(), "Completion Date cannot be in the future")
      .nullable(),
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
      <h1 className="text-2xl py-6">Educational Details</h1>
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
                className="block text-sm font-medium leading-6 text-gray-500"
              >
                Qualification
              </label>
              <div className="mt-2">
                <Field
                  as="select"
                  name="qualification"
                  class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                >
                  <option value="">Select Qualification</option>
                  <option value="10th">10th</option>
                  <option value="12th">12th</option>
                  <option value="Diploma">Diploma</option>
                  <option value="Bachelors">Bachelors</option>
                  <option value="Masters">Masters</option>
                  <option value="PhD">PhD</option>
                </Field>
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
                className="block text-sm font-medium leading-6 text-gray-500"
              >
                Program
              </label>
              <div className="mt-2">
                <Field
                  type="text"
                  name="program"
                  class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
                className="block text-sm font-medium leading-6 text-gray-500"
              >
                Specialization
              </label>
              <div className="mt-2">
                <Field
                  type="text"
                  name="specialization"
                  class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
                className="block text-sm font-medium leading-6 text-gray-500"
              >
                Program Type
              </label>
              <div className="mt-2">
                <Field
                  as="select"
                  name="programType"
                  class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
                className="block text-sm font-medium leading-6 text-gray-500"
              >
                University/Board
              </label>
              <div className="mt-2">
                <Field
                  type="text"
                  name="university"
                  class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
                className="block text-sm font-medium leading-6 text-gray-500"
              >
                Institute/School/College
              </label>
              <div className="mt-2">
                <Field
                  type="text"
                  name="institute"
                  class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
                className="block text-sm font-medium leading-6 text-gray-500"
              >
                Start Year
              </label>
              <div className="mt-2">
                <Field
                  type="month"
                  name="startYear"
                  class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
                className="block text-sm font-medium leading-6 text-gray-500"
              >
                Completion Year
              </label>
              <div className="mt-2">
                <Field
                  type="month"
                  name="completionYear"
                  class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
                className="block text-sm font-medium leading-6 text-gray-500"
              >
                Percentage/CGPA
              </label>
              <div className="mt-2">
                <Field
                  type="number"
                  name="percentageOrCGPA"
                  class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
                className="px-4 py-2 bg-primary text-white rounded-md mx-auto"
                disabled={loading}
              >
                {loading ? "Submitting..." : isEditMode ? "Update" : "Submit"}
              </button>
            </div>
          </Form>
        )}
      </Formik>

      <hr className="my-6 border-t border-gray-300" />

      <h3 className="text-2xl font-semibold leading-6 text-gray-900 py-2">
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
                {formatDateToMonthYear(edu.startYear)} to{" "}
                {formatDateToMonthYear(edu.completionYear) || "Present"}
                <br />
                University/Board: {edu.university}
                <br />
                Institute: {edu.institute}
                <br />
                Percentage/CGPA: {edu.percentageOrCGPA}
              </p>
              <div className="my-2 flex space-x-4">
                <button
                  onClick={() => handleEdit(edu)}
                  className="text-primary border px-3 py-1 rounded-md border-primary text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(edu._id)}
                  className="px-3 py-1 rounded-md text-sm bg-red-500 text-white"
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
