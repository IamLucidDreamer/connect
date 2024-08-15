import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { PencilAltIcon, UserCircleIcon } from "@heroicons/react/outline";
import { server } from "../../helpers/apiCall";
import { Formik } from "formik";
import * as Yup from "yup";
import Loader from "../../components/loader/index";
import { setUser } from "../../store/actions/userActions";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const editProfileValidation = Yup.object({});

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmitForm = (values) => {
    setLoading(true);
    server
      .put("/user/update", values)
      .then((res) => {
        toast.success(res?.data?.message);
        dispatch(setUser(res?.data?.data));
        setEdit(false);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.error);
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Formik
        initialValues={{
          profileImage: user?.profileImage || null,
          name: user?.name || "",
          email: user?.email || "",
          gender: user?.gender || "",
          organizations: user?.organizations || [],
          batch: user?.batch || "",
        }}
        validationSchema={editProfileValidation}
        onSubmit={(values) => handleSubmitForm(values)}
      >
        {({ values, handleChange, handleSubmit }) => {
          return (
            <div className="w-full min-h-screen bg-gray-100">
              <div
                className="h-36 lg:h-60 w-full bg-no-repeat bg-right bg-cover"
                style={{
                  backgroundImage: `url(https://img.freepik.com/free-photo/plain-smooth-green-wall-texture_53876-129746.jpg)`,
                }}
              ></div>
              <div className="container mx-auto px-2 sm:px-4 lg:px-8">
                <div className="">
                  <div
                    className={`relative flex items-end justify-between ${
                      edit ? "w-fit" : "w-full"
                    }`}
                  >
                    <UserCircleIcon className="text-primary w-32 h-32 lg:w-52 lg:h-52 -mt-16 lg:-mt-28 bg-white rounded-full shadow-lg" />
                    {!edit ? (
                      <button
                        className="bg-secondary text-white p-2 rounded-full mb-4 mt-1"
                        onClick={() => setEdit(!edit)}
                      >
                        <PencilAltIcon className="w-6 h-6 text-white" />
                      </button>
                    ) : null}
                  </div>
                  <div className="px-1 lg:px-4 flex flex-wrap gap-2 xl:gap-4 w-full md:w-2/3 my-3">
                    <div className="my-2 w-full max-w-none  lg:max-w-screen-xs">
                      <h1 className="text-gray-500">Email</h1>
                      <input
                        disabled={true}
                        className={`w-full font-semibold text-lg bg-transparent p-1 rounded-md focus:outline-primary`}
                        value={values.email}
                      />
                    </div>
                    <div className="lg:flex gap-8 w-full">
                      <div className="lg:w-1/2">
                        <div className="my-2 w-full max-w-none  lg:max-w-screen-xs">
                          <h1 className="text-gray-500">Name</h1>
                          <input
                            id="name"
                            name="name"
                            placeholder="Enter Your Name"
                            disabled={!edit}
                            className={`w-full font-semibold text-lg bg-transparent p-1 border rounded-md focus:outline-primary ${
                              edit ? "border-primary" : "border-transparent"
                            }`}
                            value={values.name}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="my-2 w-full max-w-none lg:max-w-screen-xs">
                          <h1 className="text-gray-500">Batch</h1>
                          <select
                            id="batch"
                            name="batch"
                            disabled={!edit}
                            value={values.batch}
                            onChange={handleChange}
                            className={`w-full font-semibold text-lg bg-transparent p-1 border rounded-md focus:outline-primary ${
                              edit ? "border-primary" : "border-transparent"
                            }`}
                          >
                            <option value="" disabled>
                              Select Batch
                            </option>
                            {[
                              "2027-28",
                              "2025-26",
                              "2024-25",
                              "2023-24",
                              "2022-23",
                              "2021-22",
                              "2020-21",
                              "2019-20",
                              "2018-19",
                              "2017-18",
                              "2016-17",
                              "2015-16",
                              "2014-15",
                              "2013-14",
                            ].map((batch, index) => (
                              <option key={index} value={batch}>
                                {batch}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="lg:w-1/2">
                        <div className="my-2 w-full max-w-none  lg:max-w-screen-xs">
                          <h1 className="text-gray-500">Organizations</h1>
                          <select
                            id="organizations"
                            name="organizations"
                            disabled={!edit}
                            multiple
                            value={values.organizations}
                            onChange={handleChange}
                            className={`w-full font-semibold text-lg bg-transparent p-1 border rounded-md focus:outline-primary ${
                              edit ? "border-primary" : "border-transparent"
                            }`}
                          >
                            {["Organization Name Here"].map((org, index) => (
                              <option key={index} value={org}>
                                {org}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4 mb-5 w-full md:w-2/3 items-center justify-around">
                    {edit ? (
                      <button
                        disabled={loading}
                        className="bg-secondary text-white p-1 sm:p-2 py-2 rounded-md w-40 text-sm sm:text-base"
                        onClick={() => setEdit(false)}
                      >
                        Discard Changes
                      </button>
                    ) : null}
                    {edit ? (
                      <button
                        className="bg-green-500 text-white p-1 xs:p-2 py-2 rounded-md w-40 text-sm sm:text-base"
                        type="submit"
                        onClick={handleSubmit}
                        disabled={loading}
                      >
                        {loading ? (
                          <Loader width={25} height={25} />
                        ) : (
                          "Save Changes"
                        )}
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </Formik>
      <EducationForm />
    </>
  );
};

export default Profile;

const EducationForm = ({ initialData, onSubmit }) => {
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    school: Yup.string().required("School name is required"),
    degree: Yup.string().required("Degree is required"),
    fieldOfStudy: Yup.string().required("Field of Study is required"),
    startDate: Yup.date().required("Start Date is required").nullable(),
    endDate: Yup.date()
      .nullable()
      .min(Yup.ref("startDate"), "End Date cannot be before Start Date"),
    description: Yup.string(),
  });

  const handleSubmitForm = (values) => {
    setLoading(true);
    server
      .put("/user/education", values)
      .then((res) => {
        toast.success(res?.data?.message);
        setEdit(false);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.error);
      })
      .finally(() => setLoading(false));
  };

  return (
    <Formik
      initialValues={{
        school: initialData?.school || "",
        degree: initialData?.degree || "",
        fieldOfStudy: initialData?.fieldOfStudy || "",
        startDate: initialData?.startDate || "",
        endDate: initialData?.endDate || "",
        description: initialData?.description || "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => handleSubmitForm(values)}
    >
      {({ values, handleChange, handleSubmit }) => (
        <div className="w-full min-h-screen bg-gray-100">
          <div className="container mx-auto px-2 sm:px-4 lg:px-8">
            <div className="flex flex-wrap gap-2 xl:gap-4 w-full my-3">
              <div className="my-2 w-full max-w-none lg:max-w-screen-xs">
                <h1 className="text-gray-500">School</h1>
                <input
                  id="school"
                  name="school"
                  placeholder="Enter School Name"
                  disabled={!edit}
                  className={`w-full font-semibold text-lg bg-transparent p-1 border rounded-md focus:outline-primary ${
                    edit ? "border-primary" : "border-transparent"
                  }`}
                  value={values.school}
                  onChange={handleChange}
                />
              </div>

              <div className="my-2 w-full max-w-none lg:max-w-screen-xs">
                <h1 className="text-gray-500">Degree</h1>
                <input
                  id="degree"
                  name="degree"
                  placeholder="Enter Degree"
                  disabled={!edit}
                  className={`w-full font-semibold text-lg bg-transparent p-1 border rounded-md focus:outline-primary ${
                    edit ? "border-primary" : "border-transparent"
                  }`}
                  value={values.degree}
                  onChange={handleChange}
                />
              </div>

              <div className="my-2 w-full max-w-none lg:max-w-screen-xs">
                <h1 className="text-gray-500">Field of Study</h1>
                <input
                  id="fieldOfStudy"
                  name="fieldOfStudy"
                  placeholder="Enter Field of Study"
                  disabled={!edit}
                  className={`w-full font-semibold text-lg bg-transparent p-1 border rounded-md focus:outline-primary ${
                    edit ? "border-primary" : "border-transparent"
                  }`}
                  value={values.fieldOfStudy}
                  onChange={handleChange}
                />
              </div>

              <div className="lg:flex gap-8 w-full">
                <div className="lg:w-1/2">
                  <div className="my-2 w-full max-w-none lg:max-w-screen-xs">
                    <h1 className="text-gray-500">Start Date</h1>
                    <input
                      id="startDate"
                      name="startDate"
                      type="date"
                      disabled={!edit}
                      className={`w-full font-semibold text-lg bg-transparent p-1 border rounded-md focus:outline-primary ${
                        edit ? "border-primary" : "border-transparent"
                      }`}
                      value={values.startDate}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="my-2 w-full max-w-none lg:max-w-screen-xs">
                    <h1 className="text-gray-500">End Date</h1>
                    <input
                      id="endDate"
                      name="endDate"
                      type="date"
                      disabled={!edit}
                      className={`w-full font-semibold text-lg bg-transparent p-1 border rounded-md focus:outline-primary ${
                        edit ? "border-primary" : "border-transparent"
                      }`}
                      value={values.endDate}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="lg:w-1/2">
                  <div className="my-2 w-full max-w-none lg:max-w-screen-xs">
                    <h1 className="text-gray-500">Description</h1>
                    <textarea
                      id="description"
                      name="description"
                      placeholder="Enter Description"
                      disabled={!edit}
                      className={`w-full font-semibold text-lg bg-transparent p-1 border rounded-md focus:outline-primary ${
                        edit ? "border-primary" : "border-transparent"
                      }`}
                      value={values.description}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mb-5 w-full items-center justify-around">
              {edit ? (
                <button
                  disabled={loading}
                  className="bg-secondary text-white p-1 sm:p-2 py-2 rounded-md w-40 text-sm sm:text-base"
                  onClick={() => setEdit(false)}
                >
                  Discard Changes
                </button>
              ) : (
                <button
                  className="bg-secondary text-white p-1 sm:p-2 py-2 rounded-md w-40 text-sm sm:text-base"
                  onClick={() => setEdit(true)}
                >
                  Edit
                </button>
              )}
              {edit ? (
                <button
                  className="bg-green-500 text-white p-1 sm:p-2 py-2 rounded-md w-40 text-sm sm:text-base"
                  type="submit"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};
