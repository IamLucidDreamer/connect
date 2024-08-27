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

const EducationForm = () => {
  const userId = useSelector((state) => state?.user?._id);
  const [educationList, setEducationList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editEducationId, setEditEducationId] = useState(null);

  // State for form initial values
  const [formInitialValues, setFormInitialValues] = useState({
    school: "",
    degree: "",
    fieldOfStudy: "",
    startDate: "",
    endDate: "",
  });

  const validationSchema = Yup.object({
    school: Yup.string().required("School name is required"),
    degree: Yup.string().required("Degree is required"),
    fieldOfStudy: Yup.string().required("Field of Study is required"),
    startDate: Yup.date().required("Start Date is required").nullable(),
    endDate: Yup.date()
      .nullable()
      .min(Yup.ref("startDate"), "End Date cannot be before Start Date"),
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
      school: education.school,
      degree: education.degree,
      fieldOfStudy: education.fieldOfStudy,
      startDate: education.startDate.split("T")[0],
      endDate: education.endDate ? education.endDate.split("T")[0] : "",
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
                htmlFor="school"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                School
              </label>
              <div className="mt-2">
                <Field
                  type="text"
                  name="school"
                  className="block w-full flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm bg-white border-gray-300 rounded-lg p-1"
                  placeholder="Enter your school"
                />
                <ErrorMessage
                  name="school"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="degree"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Degree
              </label>
              <div className="mt-2">
                <Field
                  type="text"
                  name="degree"
                  className="block w-full flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm bg-white border-gray-300 rounded-lg p-1"
                  placeholder="Enter your degree"
                />
                <ErrorMessage
                  name="degree"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="fieldOfStudy"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Field of Study
              </label>
              <div className="mt-2">
                <Field
                  type="text"
                  name="fieldOfStudy"
                  className="block w-full flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm bg-white border-gray-300 rounded-lg p-1"
                  placeholder="Enter your field of study"
                />
                <ErrorMessage
                  name="fieldOfStudy"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="startDate"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Start Date
              </label>
              <div className="mt-2">
                <Field
                  type="date"
                  name="startDate"
                  className="block w-full flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm bg-white border-gray-300 rounded-lg p-1"
                />
                <ErrorMessage
                  name="startDate"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="endDate"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                End Date
              </label>
              <div className="mt-2">
                <Field
                  type="date"
                  name="endDate"
                  className="block w-full flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm bg-white border-gray-300 rounded-lg p-1"
                />
                <ErrorMessage
                  name="endDate"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>
            </div>

            <div className="sm:col-span-full">
              <button
                type="submit"
                className="mt-4 inline-flex justify-center rounded-md bg-indigo-600 py-2 px-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
              <strong>{edu.school}</strong> - {edu.degree} in {edu.fieldOfStudy}
              <br />
              {edu.startDate} to {edu.endDate || "Present"}
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
    company: "",
    title: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const validationSchema = Yup.object({
    company: Yup.string().required("Company name is required"),
    title: Yup.string().required("Title is required"),
    location: Yup.string(),
    startDate: Yup.date().required("Start Date is required").nullable(),
    endDate: Yup.date()
      .nullable()
      .min(Yup.ref("startDate"), "End Date cannot be before Start Date"),
    description: Yup.string(),
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
      company: professional.company,
      title: professional.title,
      location: professional.location,
      startDate: professional.startDate.split("T")[0],
      endDate: professional.endDate ? professional.endDate.split("T")[0] : "",
      description: professional.description,
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
                htmlFor="company"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Company
              </label>
              <div className="mt-2">
                <Field
                  type="text"
                  name="company"
                  className="block w-full flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm bg-white border-gray-300 rounded-lg p-1"
                  placeholder="Enter your company"
                />
                <ErrorMessage
                  name="company"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Title
              </label>
              <div className="mt-2">
                <Field
                  type="text"
                  name="title"
                  className="block w-full flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm bg-white border-gray-300 rounded-lg p-1"
                  placeholder="Enter your title"
                />
                <ErrorMessage
                  name="title"
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
                  className="block w-full flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm bg-white border-gray-300 rounded-lg p-1"
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
                htmlFor="startDate"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Start Date
              </label>
              <div className="mt-2">
                <Field
                  type="date"
                  name="startDate"
                  className="block w-full flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm bg-white border-gray-300 rounded-lg p-1"
                />
                <ErrorMessage
                  name="startDate"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="endDate"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                End Date
              </label>
              <div className="mt-2">
                <Field
                  type="date"
                  name="endDate"
                  className="block w-full flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm bg-white border-gray-300 rounded-lg p-1"
                />
                <ErrorMessage
                  name="endDate"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Description
              </label>
              <div className="mt-2">
                <Field
                  as="textarea"
                  name="description"
                  className="block w-full flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm bg-white border-gray-300 rounded-lg p-1"
                  placeholder="Enter description (optional)"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>
            </div>

            <div className="sm:col-span-full">
              <button
                type="submit"
                className="mt-4 inline-flex justify-center rounded-md bg-indigo-600 py-2 px-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
              <strong>{prof.company}</strong> - {prof.title} in {prof.location}
              <br />
              {prof.startDate} to {prof.endDate || "Present"}
              <br />
              <em>{prof.description}</em>
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
