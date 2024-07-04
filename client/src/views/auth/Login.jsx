import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { KeyIcon, UserIcon } from "@heroicons/react/outline";
import { toast } from "react-toastify";

import CustomValidationErrorMessage from "../../components/errors/CustomValidationErrorMessage";
import Loader from "../../components/loader/index";
import { login } from "../../services/authService";
import AuthLayout from "../layout/AuthLayout";
import AppLogo from "../../components/images/AppIcon";
import image from "../../assets/images/login.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/actions/userActions";
import { getAuthToken } from "../../helpers/auth";
import { useSelector } from "react-redux";

const loginValidation = Yup.object({
  username: Yup.string().required("This field is Required").email("Invalid Email"),
  password: Yup.string()
    .required("Password field is required")
    .min(8, "The Password lenght should be atleast 8 characters"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const appInApp = useSelector((state) => state.appInApp.appInApp);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const authToken = getAuthToken();
    if (authToken?.length) {
      navigate("/dashboard/predictor");
    }
  }, []);

  const handleLogin = async (values, resetForm) => {
    setLoading(true);
    try {
      if (/^(\d+-)*(\d+)$/.test(values.username)) {
        values.phoneNumber = values.username;
        delete values.username;
      } else {
        values.email = values.username;
        delete values.username;
      }
      const response = await login(values);
      const { status } = response;
      if (status >= 200 && status < 300) {
        if (appInApp) {
          navigate(
            `/login-success?app_in_app=true&auth_token=${response?.data?.token}&user_id=${response?.data?.user?._id}`
          );
        } else {
          delete response?.data?.user?.encrypted_password;
          dispatch(setUser(response?.data?.user));
          localStorage.setItem("authToken", response?.data?.token);
          navigate("/dashboard/predictor");
        }
        toast.success("Login Was Success");
      }
    } catch (err) {
      console.error("Error : ", err);
      toast.error(err?.response?.data?.error || "Something went Wrong");
    }
    setLoading(false);
    resetForm();
  };
  return (
    <>
      <AuthLayout
        show={true}
        imageLink={image}
        title={"Sign In"}
        description={
          "Login and continue with your registered account to get access to premium content."
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
                username: "",
                password: "",
              }}
              validationSchema={loginValidation}
              onSubmit={(values, { resetForm }) =>
                handleLogin(values, resetForm)
              }
            >
              {({ values, touched, errors, handleChange, handleSubmit }) => {
                return (
                  <>
                    <div className="w-11/12 ">
                      <div className="bg-gray-50 text-secondary flex gap-3 items-center px-3 rounded-lg my-5 shadow-lg">
                        <UserIcon className="w-5 h-5" />
                        <input
                          id="username"
                          placeholder="Email"
                          className="p-2.5 text-lg rounded-lg bg-gray-50 w-full focus:outline-none"
                          type="username"
                          value={values.username}
                          onChange={handleChange}
                        />
                      </div>
                      <CustomValidationErrorMessage
                        show={
                          touched.username && errors.username ? true : false
                        }
                        error={errors.username}
                      />
                      <div className="bg-gray-50 text-secondary flex gap-3 items-center px-3 rounded-lg my-5 shadow-lg">
                        <KeyIcon className="w-5 h-5" />
                        <input
                          id="password"
                          placeholder="Password"
                          className="p-2.5 text-lg rounded-lg bg-gray-50 w-full focus:outline-none"
                          type="password"
                          value={values.password}
                          onChange={handleChange}
                        />
                      </div>
                      <CustomValidationErrorMessage
                        show={
                          touched.password && errors.password ? true : false
                        }
                        error={errors.password}
                      />

                      <button
                        className="p-2.5 text-lg rounded-lg bg-secondary text-white w-full my-3 shadow-lg"
                        type="submit"
                        onClick={handleSubmit}
                        disabled={loading ? true : false}
                      >
                        {loading ? (
                          <Loader width={25} height={25} />
                        ) : (
                          "Sign In"
                        )}
                      </button>
                      <div className="text-sm w-full text-right my-1 px-3">
                        <Link to={"/forgot-password"}>Forgot Password ?</Link>
                      </div>
                      {/* <div className="flex items-center gap-2 mt-4 mb-2 w-11/12 ">
                      <div className="bg-secondary h-0.5 w-full"></div>
                      <h1 className="text-sm text-secondary">or</h1>
                      <div className="bg-secondary h-0.5 w-full"></div>
                    </div>
                    <div className="flex justify-around w-11/12  mb-2">
                      <button className="rounded-lg w-32 p-1 border-2 border-secondary">
                        Google
                      </button>
                      <button className="rounded-lg w-32 p-1 border-2 border-secondary">
                        Facebook
                      </button>
                    </div> */}
                      <div className="text-sm my-3 text-center">
                        Don't have and account ?{" "}
                        <Link
                          to={"/signup"}
                          className="text-primary font-semibold"
                        >
                          Sign Up
                        </Link>
                      </div>
                    </div>
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

export default Login;
