import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import server from "../../../helpers/apiCall";
import { useSelector } from "react-redux";
import formatDateToMonthYear from "../../../helpers";
import { getAllOrganizationsNames } from "../../../services/organizationService";

const EducationForm = () => {
  const userId = useSelector((state) => state?.user?._id);
  const [educationList, setEducationList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editEducationId, setEditEducationId] = useState(null);
  const [formVisible, setFormVisible] = useState(false);
  const [organizationList, setOrganizationList] = useState([]);

  const getOrganizationList = () => {
    try {
      const response = getAllOrganizationsNames();
      if (response.status >= 200 && response.status < 300) {
        setOrganizationList(response.data.data);
      }
    } catch (err) {
      console.error("Error : ", err);
    }
  };

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
    getOrganizationList();
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
      setFormVisible(false);
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
    setFormVisible(true);
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
      {/* Education Records */}
      {educationList.length > 0 && (
        <div className="mb-6">
          {educationList.map((education) => (
            <div
              key={education._id}
              className="mb-4 border p-4 rounded-md shadow-md grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
            >
              <div className="sm:col-span-3">
                <label className="block text-sm font-medium leading-6 text-gray-500">
                  Qualification
                </label>
                <p className="mt-2 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5">
                  {education.qualification}
                </p>
              </div>

              <div className="sm:col-span-3">
                <label className="block text-sm font-medium leading-6 text-gray-500">
                  Program
                </label>
                <p className="mt-2 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5">
                  {education.program}
                </p>
              </div>

              <div className="sm:col-span-3">
                <label className="block text-sm font-medium leading-6 text-gray-500">
                  Specialization
                </label>
                <p className="mt-2 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5">
                  {education.specialization}
                </p>
              </div>

              <div className="sm:col-span-3">
                <label className="block text-sm font-medium leading-6 text-gray-500">
                  Program Type
                </label>
                <p className="mt-2 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5">
                  {education.programType}
                </p>
              </div>

              <div className="sm:col-span-3">
                <label className="block text-sm font-medium leading-6 text-gray-500">
                  University/Board
                </label>
                <p className="mt-2 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5">
                  {education.university}
                </p>
              </div>

              <div className="sm:col-span-3">
                <label className="block text-sm font-medium leading-6 text-gray-500">
                  Institute/School/College
                </label>
                <p className="mt-2 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5">
                  {education.institute}
                </p>
              </div>

              <div className="sm:col-span-3">
                <label className="block text-sm font-medium leading-6 text-gray-500">
                  Start Year
                </label>
                <p className="mt-2 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5">
                  {formatDateToMonthYear(education.startYear)}
                </p>
              </div>

              {education.completionYear && (
                <div className="sm:col-span-3">
                  <label className="block text-sm font-medium leading-6 text-gray-500">
                    Completion Year
                  </label>
                  <p className="mt-2 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5">
                    {formatDateToMonthYear(education.completionYear)}
                  </p>
                </div>
              )}

              {education.percentageOrCGPA && (
                <div className="sm:col-span-3">
                  <label className="block text-sm font-medium leading-6 text-gray-500">
                    Percentage/CGPA
                  </label>
                  <p className="mt-2 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5">
                    {education.percentageOrCGPA}
                  </p>
                </div>
              )}

              <div className="sm:col-span-6 mt-4 flex gap-2">
                <button
                  onClick={() => handleEdit(education)}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(education._id)}
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
          setFormVisible(true);
        }}
        className="mb-4 inline-flex items-center px-4 py-2 bg-primary text-white text-sm font-medium rounded-md shadow-sm hover:bg-blue-600"
      >
        Add Education Details
      </button>

      {formVisible && (
        <Formik
          initialValues={formInitialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {({ resetForm }) => (
            <Form className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
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
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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

              <div className="sm:col-span-3">
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
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Enter your program"
                  />
                  <ErrorMessage
                    name="program"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
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
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Enter your specialization"
                  />
                  <ErrorMessage
                    name="specialization"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
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
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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

              <div className="sm:col-span-3">
                <Field
                  as="select"
                  name="programType"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                >
                  <option value="" disabled organization>
                    Select Your Organization
                  </option>
                  {organizationList.map((org) => (
                    <option key={org._id} value={org._id}>
                      {org.name}
                    </option>
                  ))}
                </Field>
              </div>

              <div className="sm:col-span-3">
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
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Enter your institute/school/college"
                  />
                  <ErrorMessage
                    name="institute"
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
                    placeholder="Enter start year"
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
                  Completion Year
                </label>
                <div className="mt-2">
                  <Field
                    type="month"
                    name="completionYear"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Enter completion year"
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
                  htmlFor="percentageOrCGPA"
                  className="block text-sm font-medium leading-6 text-gray-500"
                >
                  Percentage/CGPA
                </label>
                <div className="mt-2">
                  <Field
                    type="number"
                    name="percentageOrCGPA"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
                <button
                  type="button"
                  onClick={() => setFormVisible(false)}
                  className="px-4 py-2 bg-gray-300 text-black rounded-md mx-auto ml-4"
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

export default EducationForm;
