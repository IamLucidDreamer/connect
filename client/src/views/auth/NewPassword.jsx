import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import OTPInput, { ResendOTP } from "otp-input-react";
import { toast } from "react-toastify";

import CustomValidationErrorMessage from "../../components/errors/CustomValidationErrorMessage";
import Loader from "../../components/loader/index";
import { forgotPassword, sendOtp } from "../../services/authService";
import AuthLayout from "../layout/AuthLayout";
import AppLogo from "../../components/images/AppLogo";
import image from "../../assets/images/verify_otp_bg.jpg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { setUser } from "../../store/actions/userActions";
import { useDispatch } from "react-redux";
import { KeyIcon, CheckIcon } from "@heroicons/react/outline";
import { useSelector } from "react-redux";

const newPassworValidation = Yup.object({
  otp: Yup.string()
    .min(6, "OTP must be 6 digits")
    .required("The OTP is required"),
  newPassword: Yup.string()
    .required("Password field is required")
    .min(8, "The Password length should be atleast 8 characters"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("newPassword"), null],
    "Passwords must match"
  ),
});

const NewPassword = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const appInApp = useSelector((state) => state.appInApp.appInApp);

  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  useEffect(() => {
    if (!state) {
      navigate("/forgot-password");
    }
  }, []);

  const resenOTP = async () => {
    setResendLoading(true);
    try {
      const response = await sendOtp(
        `${state.values.countryCode}${state.values.phoneNumber}`
      );
      const { status } = response;
      if (status >= 200 && status < 300) {
        toast.success(
          `OTP Re-Sent Succesfully to ${state.values.countryCode}${state.values.phoneNumber}`
        );
      }
    } catch (err) {
      console.error("Error : ", err);
      toast.error(err?.message || "Something went Wrong");
    }
    setResendLoading(false);
  };

  const handleNewPassword = async (values) => {
    setLoading(true);
    const data = { ...state.values, ...values };
    try {
      const response = await forgotPassword(data);  
      const { status } = response;
      if (status >= 200 && status < 300) {
        if (appInApp) {
          navigate(
            `/login-success?app_in_app=true&auth_token=${response?.data?.token}&user_id=${response?.data?.data?._id}`
          );
        } else {
          dispatch(setUser(response?.data?.data));
          localStorage.setItem("authToken", response?.data?.token);
          navigate("/dashboard/predictor");
        }
        toast.success(
          "Password Reset Succesfully, Welcome back to Career Kick"
        );
      }
    } catch (err) {
      console.error("Error : ", err);
      toast.error(err?.response?.data?.error || "Something went Wrong");
    }
    setLoading(false);
  };

  return (
    <>
      <AuthLayout
        show={true}
        imageLink={image}
        title={"Set Password"}
        description={
          "Enter the OTP and new password you are want to use for the login."
        }
        form={
          <div className="w-11/12 lg:w-10/12 xl:w-2/3 flex flex-col items-center justify-center max-w-sm">
            <AppLogo
              width={"250px"}
              height={"250px"}
              classname={"mx-auto mb-4"}
            />
            <Formik
              initialValues={{
                otp: "",
                newPassword: "",
                confirmPassword: "",
              }}
              validationSchema={newPassworValidation}
              onSubmit={(values) => handleNewPassword(values)}
            >
              {({
                values,
                touched,
                errors,
                setFieldValue,
                handleChange,
                handleSubmit,
              }) => {
                return (
                  <>
                    <div className="w-11/12">
                      <h1 className="text-lg text-secondary">
                        {`Enter the OTP sent to : ${
                          state?.values?.countryCode || ""
                        }${state?.values?.phoneNumber || ""}`}
                      </h1>
                      <div className="text-secondary items-center rounded-lg my-3">
                        <OTPInput
                          style={{
                            justifyContent: "space-between",
                            gap: 25,
                          }}
                          inputStyles={{
                            backgroundColor: "#e5e7eb",
                            width: "100%",
                            margin: "0px",
                            borderRadius: 5,
                            boxShadow: "0 5px 8px -3px rgb(0 0 0 / 0.2)",
                          }}
                          value={values.otp}
                          onChange={(e) => {
                            setFieldValue("otp", e);
                          }}
                          autoFocus
                          OTPLength={6}
                          otpType="number"
                          disabled={false}
                          secure
                        />
                      </div>
                      <CustomValidationErrorMessage
                        show={touched.otp && errors.otp ? true : false}
                        error={errors.otp}
                      />
                      <div className="bg-gray-100 text-secondary flex gap-3 items-center px-3 rounded-lg my-5 shadow-lg">
                        <KeyIcon className="w-4 h-4" />
                        <input
                          id="newPassword"
                          placeholder="New Password"
                          className="p-2.5 text-lg rounded-lg bg-gray-100 w-full focus:outline-none"
                          type="password"
                          value={values.newPassword}
                          onChange={handleChange}
                        />
                      </div>
                      <CustomValidationErrorMessage
                        show={
                          touched.newPassword && errors.newPassword
                            ? true
                            : false
                        }
                        error={errors.newPassword}
                      />
                      <div className="bg-gray-100 text-secondary flex gap-3 items-center px-3 rounded-lg my-5 shadow-lg">
                        <CheckIcon className="w-4 h-4" />
                        <input
                          id="confirmPassword"
                          placeholder="Confirm Password"
                          className="p-2.5 text-lg rounded-lg bg-gray-100 w-full focus:outline-none"
                          type="password"
                          value={values.confirmPassword}
                          onChange={handleChange}
                        />
                      </div>
                      <CustomValidationErrorMessage
                        show={
                          touched.confirmPassword && errors.confirmPassword
                            ? true
                            : false
                        }
                        error={errors.confirmPassword}
                      />
                    </div>
                    <button
                      className="p-2.5 text-lg rounded-lg bg-secondary text-white w-11/12 my-3 shadow-lg"
                      type="submit"
                      onClick={handleSubmit}
                      disabled={loading}
                    >
                      {loading ? <Loader width={25} height={25} /> : "Submit"}
                    </button>
                    <div className="text-sm flex w-full justify-end px-5">
                      <ResendOTP
                        className="flex justify-between items-center gap-5"
                        onResendClick={() => {
                          resenOTP();
                        }}
                      />
                    </div>
                  </>
                );
              }}
            </Formik>
            {resendLoading ? (
              <Loader coverFullScreen={true} width={25} height={25} />
            ) : null}
          </div>
        }
      />
    </>
  );
};

export default NewPassword;
