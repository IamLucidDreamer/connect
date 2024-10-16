import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import CustomValidationErrorMessage from "../../components/errors/CustomValidationErrorMessage";
import Loader from "../../components/loader/index";
import { toast } from "react-toastify";
import AuthLayout from "../layout/AuthLayout";
import AppLogo from "../../components/images/AppIcon";
import image from "../../assets/images/login.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  KeyIcon,
  MailIcon,
  LibraryIcon,
  EyeIcon,
  ChevronRightIcon,
} from "@heroicons/react/outline";
import { signup } from "../../services/authService";
import { setUser } from "../../store/actions/userActions";
import { parseErrorMessage } from "../../helpers/apiCallHerlper";
import { getAllOrganizationsNames } from "../../services/organizationService";

const signUpalidation = Yup.object({
  firstName: Yup.string()
    .required("Name field is required")
    .min(3, "The Name length should be atleast 3 characters"),
  email: Yup.string()
    .email("Not a Valid Email Address")
    .required("The Email Address field is required"),
  password: Yup.string()
    .required("Password field is required")
    .min(8, "The Password length should be atleast 8 characters"),

  organizationName: Yup.string().when("organization", {
    is: false,
    then: Yup.string().required("Organization Name is required"),
    otherwise: Yup.string().notRequired(),
  }),
});

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [organization, setOrganization] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [organizationList, setOrganizationList] = useState([]);

  const getOrganizationList =async  () => {
    try {
      const response =await  getAllOrganizationsNames();
      if (response.status >= 200 && response.status < 300) {
        setOrganizationList(response.data.data);
      }
    } catch (err) {
      console.error("Error : ", err);
    }
  };

  useEffect(() => {
    getOrganizationList();
  }, []);

  const handleSignUp = async (values, setErrors) => {
    if (!values.consent) {
      setErrors({ consent: "Please accept the terms of service." });
      return;
    }
    setLoading(true);
    try {
      const response = await signup(values, !organization);
      if (response.status >= 200 && response.status < 300) {
        toast.success(response?.data?.message || "Sign Up Successful");
        dispatch(
          setUser({
            email: values.email,
            userId: response?.data?.data?.userId,
            otpVerificationId: response?.data?.data?.otpVerificationId,
          })
        );
        navigate("/verify-otp");
      }
    } catch (err) {
      console.error("Error : ", err);
      toast.error(parseErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AuthLayout
        imageLink={image}
        title={"Sign Up"}
        description={
          "Sign Up and create an account and get access to exclusive content right away."
        }
        form={
          <div className="w-11/12 lg:w-10/12 xl:w-2/3 max-w-2xl flex flex-col items-center justify-center pt-4">
            <AppLogo
              width={"250px"}
              height={"250px"}
              classname={"mx-auto mb-4"}
            />
            <div className="w-full max-w-sm flex flex-col mx-auto text-center my-2">
              <div className="relative w-full mt-4 rounded-lg border h-10 p-1 bg-gray-50 text-lg">
                <div className="relative w-full h-full flex items-center">
                  <div
                    onClick={() => setOrganization(!organization)}
                    className="w-full flex justify-center text-secondary cursor-pointer"
                  >
                    <button>Individual</button>
                  </div>
                  <div
                    onClick={() => setOrganization(!organization)}
                    className="w-full flex justify-center text-secondary cursor-pointer"
                  >
                    <button>Organisation</button>
                  </div>
                </div>

                <span
                  className={`bg-white shadow flex items-center justify-center w-1/2 rounded h-[1.88rem] transition-all duration-150 ease-linear top-[4px] absolute ${
                    organization
                      ? "left-1 text-primary font-semibold"
                      : "left-1/2 -ml-1 text-primary font-semibold"
                  }`}
                >
                  {organization ? "Individual" : "Organisation"}
                </span>
              </div>
            </div>
            <Formik
              initialValues={{
                organizationName: "",
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                consent: false,
              }}
              // validationSchema={signUpalidation}
              onSubmit={(values, { setErrors }) => {
                handleSignUp(values, setErrors);
              }}
            >
              {({ values, touched, errors, handleChange, handleSubmit }) => {
                return (
                  <form className="w-full">
                    <div className="w-11/12">
                      {organization && (
                        <>
                          <label
                            for="firstName"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Your First Name
                          </label>
                          <div className="gray-50 text-secondary flex gap-3 items-center px-3 rounded-lg shadow-lg mt-4">
                            <ChevronRightIcon className="w-5 h-5" />
                            <input
                              id="firstName"
                              placeholder="First Name"
                              className="p-2.5 text-lg rounded-lg gray-50 w-full focus:outline-none"
                              type="text"
                              value={values.firstName}
                              onChange={handleChange}
                            />
                          </div>
                          <CustomValidationErrorMessage
                            show={
                              touched.firstName && errors.firstName
                                ? true
                                : false
                            }
                            error={errors.firstName}
                          />
                        </>
                      )}
                      {organization && (
                        <>
                          <div className="gray-50 text-secondary flex gap-3 items-center px-3 rounded-lg my-5 shadow-lg">
                            <ChevronRightIcon className="w-5 h-5" />
                            <input
                              id="lastName"
                              placeholder="Last Name"
                              className="p-2.5 text-lg rounded-lg gray-50 w-full focus:outline-none"
                              type="text"
                              value={values.lastName}
                              onChange={handleChange}
                            />
                          </div>
                          <CustomValidationErrorMessage
                            show={
                              touched.lastName && errors.lastName ? true : false
                            }
                            error={errors.lastName}
                          />
                        </>
                      )}
                      {!organization && (
                        <>
                          <div className="gray-50 text-secondary flex gap-3 items-center px-3 rounded-lg my-5 shadow-lg">
                            <LibraryIcon className="w-5 h-5" />
                            <select
                              id="organizationName"
                              name="organizationName"
                              className="p-2.5 text-lg rounded-lg gray-50 w-full focus:outline-none"
                              value={values.organizationName}
                              onChange={handleChange}
                            >
                              <option value="" disabled organization>
                                Select Your Organization
                              </option>
                              {organizationList.map((org) => (
                                <option key={org._id} value={org._id}>
                                  {org.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <CustomValidationErrorMessage
                            show={
                              touched.organizationName &&
                              errors.organizationName
                                ? true
                                : false
                            }
                            error={errors.organizationName}
                          />
                        </>
                      )}
                      <div className="gray-50 text-secondary flex gap-3 items-center px-3 rounded-lg my-5 shadow-lg">
                        <MailIcon className="w-5 h-5" />
                        <input
                          id="email"
                          placeholder="name@example.com"
                          className="p-2.5 text-lg rounded-lg gray-50 w-full focus:outline-none"
                          type="email"
                          value={values.email}
                          onChange={handleChange}
                        />
                      </div>
                      <CustomValidationErrorMessage
                        show={touched.email && errors.email ? true : false}
                        error={errors.email}
                      />
                      <div className="gray-50 text-secondary flex gap-3 items-center px-3 rounded-lg my-5 shadow-lg">
                        <KeyIcon className="w-4 h-4" />
                        <input
                          id="password"
                          placeholder="Password"
                          className="p-2.5 text-lg rounded-lg gray-50 w-full focus:outline-none"
                          type={showPassword ? "text" : "password"}
                          value={values.password}
                          onChange={handleChange}
                        />
                        <EyeIcon
                          onClick={() => setShowPassword(!showPassword)}
                          className="w-5 h-5 cursor-pointer"
                        />
                      </div>
                      <CustomValidationErrorMessage
                        show={
                          touched.password && errors.password ? true : false
                        }
                        error={errors.password}
                      />
                      <div className="flex items-center justify-start gap-3 ">
                        <input
                          id="consent"
                          className="p-2.5 text-lg rounded-lg gray-50 focus:outline-none"
                          name="consent"
                          type="checkbox"
                          value={values.consent}
                          onChange={handleChange}
                        />
                        <div className="">
                          <h1 className="text-sm">
                            I accept the{" "}
                            <a
                              className="text-primary hover:underline font-semibold"
                              href="https://alumns.in/term-&-conditions/"
                              target="_blank"
                            >
                              terms of service
                            </a>{" "}
                            &{" "}
                            <a
                              className="text-primary hover:underline font-semibold"
                              href="https://alumns.in/privacy-policy/"
                              target="_blank"
                            >
                              privacy policy
                            </a>
                            .
                          </h1>
                        </div>
                      </div>
                      <CustomValidationErrorMessage
                        show={touched.consent && errors.consent ? true : false}
                        error={errors.consent}
                      />
                      <button
                        className="p-2.5 text-lg rounded-lg bg-secondary text-white my-4 w-full shadow-lg"
                        type="submit"
                        onClick={handleSubmit}
                        disabled={loading}
                      >
                        {loading ? (
                          <Loader width={25} height={25} />
                        ) : (
                          "Sign Up"
                        )}
                      </button>
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
                      <div className="text-sm my-3 w-full text-center">
                        Already Have an account ?{" "}
                        <Link
                          to={"/login"}
                          className="text-primary font-semibold"
                        >
                          Sign In
                        </Link>
                      </div>
                    </div>
                  </form>
                );
              }}
            </Formik>
          </div>
        }
      />
    </>
  );
};

export default SignUp;
