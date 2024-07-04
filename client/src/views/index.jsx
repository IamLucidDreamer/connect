import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";

import image from "../assets/images/onboarding.png";
import AppLogo from "../components/images/AppIcon";
import { clearAuth, getAuthToken } from "../helpers/auth";
import { useDispatch } from "react-redux";
import { logout } from "../store/actions/userActions";

const LandingPAgeApp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logout());
    clearAuth();
  }, []);

  return (
    <>
      <AuthLayout
        imageLink={image}
        title={""}
        description={""}
        form={
          <div className="w-11/12 lg:w-10/12 xl:w-2/3 max-w-2xl flex flex-col items-center justify-center">
            <AppLogo
              width={"250px"}
              height={"250px"}
              classname={"mx-auto mb-4"}
            />
            <h1 className="text-secondary text-5xl my-2 text-center">
              Welcome
            </h1>
            <p className="text-secondary text-lg my-2 text-center">
              India's largest online consulting platform which provides
              information about regarding Educational Institutions and Colleges.
            </p>
            <div className="flex gap-4 w-full lg:w-1/2 my-4 justify-center">
              <Link
                to={"/signup"}
                className="w-32 py-2.5 rounded-3xl bg-primary text-white text-center font-semibold"
              >
                Sign Up
              </Link>
              <Link
                to={"/login"}
                className="w-32 py-2.5 rounded-3xl bg-secondary text-white text-center font-semibold"
              >
                Log In
              </Link>
            </div>
          </div>
        }
      />
    </>
  );
};

export default LandingPAgeApp;
