import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import server from "../../helpers/apiCall";
import { useSelector } from "react-redux";

const Profile = () => {
  return (
    <div>
      <EducationForm />
      <ProfessionalForm />
    </div>
  );
};

export default Profile;

const editProfileForm = () => {
  
}

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
    startYear: Yup.number()
      .required("Start Year is required")
      .min(1900, "Invalid Year")
      .max(new Date().getFullYear(), "Start Year cannot be in the future"),
    completionYear: Yup.number()
      .required("Completion Year is required")
      .min(Yup.ref("startYear"), "Completion Year cannot be before Start Year")
      .max(new Date().getFullYear(), "Completion Year cannot be in the future"),
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
      setEducationList(response.data.education);
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
        {({ values, handleChange, handleSubmit, resetForm }) => (
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
                  type="number"
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
                  type="number"
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
    </>
  );
};


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
      .oneOf(["Regular", "Freelancer", "Contract", "Parttime"], "Invalid Employment Type")
      .required("Employment Type is required"),
    companyName: Yup.string().required("Company Name is required"),
    designation: Yup.string().required("Designation is required"),
    location: Yup.string().required("Location is required"),
    startYear: Yup.number()
      .required("Start Year is required")
      .min(1900, "Invalid Year")
      .max(new Date().getFullYear(), "Start Year cannot be in the future"),
    completionYear: Yup.number()
      .min(Yup.ref("startYear"), "Completion Year cannot be before Start Year")
      .max(new Date().getFullYear(), "Completion Year cannot be in the future")
      .nullable(),
    salaryBand: Yup.string(), // Optional field
  });

  useEffect(() => {
    fetchProfessionalDetails();
  }, []);

  const fetchProfessionalDetails = async () => {
    try {
      const response = await server.get(`/user/professional/${userId}`);
      setProfessionalList(response.data.professional);
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
                  type="number"
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
                  type="number"
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
                  type="text"
                  name="salaryBand"
                  className="block w-full border-gray-300 rounded-lg p-1"
                  placeholder="Enter salary band (optional)"
                />
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
      <ul className="mt-4">
        {professionalList.map((prof) => (
          <li key={prof._id} className="mb-4">
            <p className="text-gray-700">
              <strong>{prof.currentEmployment}</strong> - {prof.designation} at{" "}
              {prof.companyName}
              <br />
              {prof.startYear} to {prof.completionYear || "Present"}
              <br />
              Employment Type: {prof.employmentType}, Location: {prof.location}
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
    </>
  );
};
