import React from "react";
import coverImage from "../../assets/images/profile_cover.jpg";
import Footer from "../../components/shared/Footer";
import Header from "../../components/shared/Header";
import { useSelector } from "react-redux";
import { useState } from "react";
import { PencilAltIcon, UserCircleIcon } from "@heroicons/react/outline";
import { server } from "../../helpers/apiCall";
import { Formik } from "formik";
import * as Yup from "yup";
import Loader from "../../components/loader/index";
import { State, City } from "country-state-city";
import { setUser } from "../../store/actions/userActions";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const editProfileValidation = Yup.object({});

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user);

  const [edit, setEdit] = useState(false);
  const [img, setImg] = useState([]);
  const [src, setSrc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [stateCode, setStateCode] = useState();

  const convertImage = (e) => {
    setImg(e.target.files[0]);
    setSrc(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmitForm = (values) => {
    setLoading(true);
    delete values.email;
    const form = new FormData();
    form.append("profileImage", img);
    form.append("data", JSON.stringify(values));

    server
      .put("/user/update", form)
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

  // console.log(City.getCitiesOfState("IN", "MH"));

  return (
    <Formik
      initialValues={{
        profileImage: user?.profileImage || null,
        name: user?.name || "",
        dateOfBirth: user?.dateOfBirth || "",
        email: user?.email || "",
        gender: user?.gender || "",
        state: user?.state || "",
        city: user?.city || "",
        address: user?.address || "",
        phone: user?.phoneNumber || "",
        examType: user?.examType || "",
        tenthMarks: user?.tenthMarks || "",
        twelthMarks: user?.twelthMarks || "",
        medicalMarks: user?.medicalMarks || "",
        course: user?.course || "",
      }}
      validationSchema={editProfileValidation}
      onSubmit={(values) => handleSubmitForm(values)}
    >
      {({ values, touched, errors, handleChange, handleSubmit }) => {
        State.getStatesOfCountry("IN").find((item) => {
          if (item.name === values.state) setStateCode(item.isoCode);
        });

        return (
          <div className="w-full min-h-screen bg-gray-100">
            <Header />
            <div
              className="h-36 lg:h-60 w-full bg-no-repeat bg-right bg-cover"
              style={{
                backgroundImage: `url(${coverImage})`,
              }}
            ></div>
            <div className="container mx-auto px-2 sm:px-4 lg:px-8">
              <div className="">
                <div
                  className={`relative flex items-end justify-between ${
                    edit ? "w-fit" : "w-full"
                  }`}
                >
                  {values?.profileImage || src ? (
                    <img
                      src={src || values.profileImage}
                      className="rounded-full w-32 h-32 lg:w-52 lg:h-52 -mt-16 lg:-mt-28 border-8 border-white"
                    />
                  ) : (
                    <UserCircleIcon className="text-primary w-32 h-32 lg:w-52 lg:h-52 -mt-16 lg:-mt-28 bg-white rounded-full shadow-lg" />
                  )}
                  {edit ? (
                    <label forHtml="file">
                      <PencilAltIcon className="w-8 text-secondary absolute bottom-3 right-3 lg:bottom-5 lg:right-5" />
                      <input
                        hidden
                        accept="image/*"
                        multiple={false}
                        type="file"
                        onChange={(e) => convertImage(e)}
                      />
                    </label>
                  ) : null}
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
                  <div className="my-2 w-full max-w-none  lg:max-w-screen-xs">
                    <h1 className="text-gray-500">Phone Number</h1>
                    <input
                      disabled={true}
                      className={`w-full font-semibold text-lg bg-transparent p-1 rounded-md focus:outline-primary`}
                      value={values.phone}
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
                      {(user?.dateOfBirth || edit) && (
                        <div className="my-2 w-full max-w-none  lg:max-w-screen-xs">
                          <h1 className="text-gray-500">Date of Birth</h1>
                          <input
                            id="dateOfBirth"
                            name="dateOfBirth"
                            disabled={!edit}
                            type="date"
                            className={`w-full font-semibold text-lg bg-transparent p-1 border rounded-md focus:outline-primary ${
                              edit ? "border-primary" : "border-transparent"
                            }`}
                            value={values.dateOfBirth}
                            onChange={handleChange}
                          />
                        </div>
                      )}
                      {(user?.gender || edit) && (
                        <div className="my-2 w-full max-w-none  lg:max-w-screen-xs">
                          <h1 className="text-gray-500">Gender</h1>
                          <select
                            id="gender"
                            name="gender"
                            disabled={!edit}
                            className={`w-full font-semibold text-lg bg-transparent p-1 border rounded-md focus:outline-primary ${
                              edit ? "border-primary" : "border-transparent"
                            }`}
                            value={values.gender}
                            onChange={handleChange}
                          >
                            <option value="" disabled>
                              Select Gender
                            </option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>
                        </div>
                      )}
                      {(user?.state || edit) && (
                        <div className="my-2 w-full max-w-none  lg:max-w-screen-xs">
                          <h1 className="text-gray-500">State</h1>
                          <select
                            id="state"
                            name="state"
                            disabled={!edit}
                            className={`w-full font-semibold text-lg bg-transparent p-1 border rounded-md focus:outline-primary ${
                              edit ? "border-primary" : "border-transparent"
                            }`}
                            value={values.state}
                            onChange={handleChange}
                          >
                            <option value="" disabled>
                              Select State
                            </option>
                            {State.getStatesOfCountry("IN").map((item) => (
                              <option value={item.name}>{item.name}</option>
                            ))}
                          </select>
                        </div>
                      )}
                      {(user?.city || edit) && (
                        <div className="my-2 w-full max-w-none lg:max-w-screen-xs">
                          <h1 className="text-gray-500">City</h1>
                          <select
                            id="city"
                            name="city"
                            disabled={!edit}
                            className={`w-full font-semibold text-lg bg-transparent p-1 border rounded-md focus:outline-primary ${
                              edit ? "border-primary" : "border-transparent"
                            }`}
                            value={values.city}
                            onChange={handleChange}
                          >
                            <option value="" disabled>
                              Select City
                            </option>
                            {City.getCitiesOfState("IN", stateCode).map(
                              (item) => (
                                <option value={item.name}>{item.name}</option>
                              )
                            )}
                          </select>
                        </div>
                      )}
                    </div>
                    <div className="lg:w-1/2">
                      {(user?.address || edit) && (
                        <div className="my-2 w-full max-w-none  lg:max-w-screen-xs">
                          <h1 className="text-gray-500">Address</h1>
                          <input
                            id="address"
                            name="address"
                            disabled={!edit}
                            className={`w-full font-semibold text-lg bg-transparent p-1 border rounded-md focus:outline-primary ${
                              edit ? "border-primary" : "border-transparent"
                            }`}
                            value={values.address}
                            onChange={handleChange}
                          />
                        </div>
                      )}
                      <div className="my-2 w-full max-w-none  lg:max-w-screen-xs">
                        <h1 className="text-gray-500">Exam</h1>
                        <select
                          id="examType"
                          name="examType"
                          disabled={!edit}
                          value={values.examType}
                          onChange={handleChange}
                          className={`w-full font-semibold text-lg bg-transparent p-1 border rounded-md focus:outline-primary ${
                            edit ? "border-primary" : "border-transparent"
                          }`}
                        >
                          <option value="" disabled>
                            Select Exam
                          </option>
                          <option value={1} disabled>
                            JEE (Comming Soon)
                          </option>
                          <option value={2}>NEET</option>
                        </select>
                      </div>
                      {(user?.tenthMarks || edit) && (
                        <div className="my-2 w-full max-w-none  lg:max-w-screen-xs">
                          <h1 className="text-gray-500">10th Marks (%)</h1>
                          <input
                            id="tenthMarks"
                            name="tenthMarks"
                            disabled={!edit}
                            className={`w-full font-semibold text-lg bg-transparent p-1 border rounded-md focus:outline-primary ${
                              edit ? "border-primary" : "border-transparent"
                            }`}
                            value={values.tenthMarks}
                            onChange={handleChange}
                          />
                        </div>
                      )}
                      {(user?.twelthMarks || edit) && (
                        <div className="my-2 w-full max-w-none lg:max-w-screen-xs">
                          <h1 className="text-gray-500">12th Marks (%)</h1>
                          <input
                            id="twelthMarks"
                            name="twelthMarks"
                            disabled={!edit}
                            className={`w-full font-semibold text-lg bg-transparent p-1 border rounded-md focus:outline-primary ${
                              edit ? "border-primary" : "border-transparent"
                            }`}
                            value={values.twelthMarks}
                            onChange={handleChange}
                          />
                        </div>
                      )}
                      {(user?.medicalMarks || edit) && (
                        <div className="my-2 w-full max-w-none lg:max-w-screen-xs">
                          <h1 className="text-gray-500">Neet Marks (%)</h1>
                          <input
                            id="medicalMarks"
                            name="medicalMarks"
                            disabled={!edit}
                            className={`w-full font-semibold text-lg bg-transparent p-1 border rounded-md focus:outline-primary ${
                              edit ? "border-primary" : "border-transparent"
                            }`}
                            value={values.medicalMarks}
                            onChange={handleChange}
                          />
                        </div>
                      )}
                      {(user?.course || edit) && (
                        <div className="my-2 w-full max-w-none lg:max-w-screen-xs">
                          <h1 className="text-gray-500">Course</h1>
                          <select
                            id="course"
                            name="course"
                            disabled={!edit}
                            value={values.course}
                            onChange={handleChange}
                            className={`w-full font-semibold text-lg bg-transparent p-1 border rounded-md focus:outline-primary ${
                              edit ? "border-primary" : "border-transparent"
                            }`}
                          >
                            <option value="" disabled>
                              Select Course
                            </option>
                            {[
                              "MBBS",
                              "BDS",
                              "BAMS",
                              "BHMS",
                              "BUMS",
                              "BSMS",
                              "BNYS",
                            ].map((item, index) => (
                              <option value={item}>{item}</option>
                            ))}
                          </select>
                        </div>
                      )}
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
            <Footer />
          </div>
        );
      }}
    </Formik>
  );
};

export default Profile;
