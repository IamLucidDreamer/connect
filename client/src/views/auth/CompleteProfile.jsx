import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { KeyIcon, UserIcon } from "@heroicons/react/outline";
import { toast } from "react-toastify";

import CustomValidationErrorMessage from "../../components/errors/CustomValidationErrorMessage";
import Loader from "../../components/loader/index";
import { login } from "../../services/authService";
import AuthLayout from "../layout/AuthLayout";
import AppLogo from "../../components/images/AppLogo";
import image from "../../assets/images/login.jpg";
import { Link } from "react-router-dom";

// const loginValidation = Yup.object({
//   email: Yup.string()
//     .email("Not a Valid Email Address")
//     .required("The Email Address is required"),
//   password: Yup.string()
//     .required("Password field is required")
//     .min(8, "The Password lenght should be atleast 8 characters"),
// });

const CompleteProfile = () => {
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const response = await login(values.email, values.password);
      const { status } = response;
      if (status >= 200 && status < 300) {
        toast.success("Login Was Success");
        localStorage.setItem("authToken", response?.data?.token);
        window.location.replace("/dashboard");
      }
    } catch (err) {
      console.error("Error : ", err);
      toast.error(err?.message || "Something went Wrong");
    }
    setLoading(false);
  };
  return (
    <>
      <AuthLayout
        show={true}
        imageLink={image}
        title={"Complete Profile"}
        description={
          "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt sapiente ducimus."
        }
        form={
          <div className="w-11/12 lg:w-10/12 xl:w-2/3 max-w-2xl flex flex-col items-center justify-center">
            <AppLogo
              width={"250px"}
              height={"250px"}
              classname={"mx-auto mb-4"}
            />
            <Formik
              initialValues={{
                tenthMarks: "",
                twelfthMarks: "",
                password: "",
              }}
            //   validationSchema={loginValidation}
              onSubmit={(values) => handleLogin(values)}
            >
              {({ values, touched, errors, handleChange, handleSubmit }) => {
                return (
                  <>
                    <div className="w-11/12 ">
                      <div className="bg-gray-100 text-secondary flex gap-3 items-center px-3 rounded-full my-3">
                        <UserIcon className="w-5 h-5" />
                        <input
                          id="tenthMarks"
                          placeholder="10th Percentage"
                          className="p-2.5 text-lg rounded-full bg-gray-100 w-full focus:outline-none"
                          type="number"
                          value={values.tenthMarks}
                          onChange={handleChange}
                        />
                      </div>
                      <CustomValidationErrorMessage
                        show={touched.tenthMarks && errors.tenthMarks ? true : false}
                        error={errors.tenthMarks}
                      />
                    </div>
                    <div className="w-11/12 ">
                      <div className="bg-gray-100 text-secondary flex gap-3 items-center px-3 rounded-full my-3">
                        <UserIcon className="w-5 h-5" />
                        <input
                          id="twelfthMarks"
                          placeholder="12th Percentage"
                          className="p-2.5 text-lg rounded-full bg-gray-100 w-full focus:outline-none"
                          type="number"
                          value={values.twelfthMarks}
                          onChange={handleChange}
                        />
                      </div>
                      <CustomValidationErrorMessage
                        show={touched.twelfthMarks && errors.twelfthMarks ? true : false}
                        error={errors.twelfthMarks}
                      />
                    </div>
                    <div className="w-11/12 ">
                      <div className="bg-gray-100 text-secondary flex gap-3 items-center px-3 rounded-full my-3">
                        <UserIcon className="w-5 h-5" />
                        <input
                          id="twelfthMarks"
                          placeholder="12th Percentage"
                          className="p-2.5 text-lg rounded-full bg-gray-100 w-full focus:outline-none"
                          type="number"
                          value={values.twelfthMarks}
                          onChange={handleChange}
                        />
                      </div>
                      <CustomValidationErrorMessage
                        show={touched.twelfthMarks && errors.twelfthMarks ? true : false}
                        error={errors.twelfthMarks}
                      />
                    </div>
                    <div className="w-11/12 ">
                      <div className="bg-gray-100 text-secondary flex gap-3 items-center px-3 rounded-full my-3">
                        <UserIcon className="w-5 h-5" />
                        <input
                          id="twelfthMarks"
                          placeholder="12th Percentage"
                          className="p-2.5 text-lg rounded-full bg-gray-100 w-full focus:outline-none"
                          type="number"
                          value={values.twelfthMarks}
                          onChange={handleChange}
                        />
                      </div>
                      <CustomValidationErrorMessage
                        show={touched.twelfthMarks && errors.twelfthMarks ? true : false}
                        error={errors.twelfthMarks}
                      />
                    </div>
                    <button
                      className="p-2.5 text-lg rounded-full bg-secondary text-white w-11/12  my-3"
                      type="submit"
                      onClick={handleSubmit}
                      disabled={loading}
                    >
                      {loading ? <Loader width={25} height={25} /> : "Save"}
                    </button>
                    {/* <div className="text-sm">
                      <Link to={"/forgot-password"}>Forgot Password</Link>
                    </div>
                    <div className="flex items-center gap-2 mt-4 mb-2 w-11/12 ">
                      <div className="bg-secondary h-0.5 w-full"></div>
                      <h1 className="text-sm text-secondary">or</h1>
                      <div className="bg-secondary h-0.5 w-full"></div>
                    </div>
                    <div className="flex justify-around w-11/12  mb-2">
                      <button className="rounded-full w-32 p-1 border-2 border-secondary">
                        Google
                      </button>
                      <button className="rounded-full w-32 p-1 border-2 border-secondary">
                        Facebook
                      </button>
                    </div>
                    <div className="text-sm my-3">
                      Don't have and account ?{" "}
                      <Link to={"/signup"}>Sign Up</Link>
                    </div> */}
                  </>
                );
              }}
            </Formik>
          </div>
        }
      />
    </>
  );
};

export default CompleteProfile;
