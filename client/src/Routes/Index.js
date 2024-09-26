import { createBrowserRouter, RouterProvider } from "react-router-dom";

import React, { lazy, Suspense } from "react";
import ProtectedRoute from "./ProtectedRoute";
import Loader from "../components/loader/index";
import Dashboard from "../views/layout/Dashboard";
import ErrorBoundary from "../components/errors/ErrorHandler";

const SignUp = lazy(() => import("../views/auth/Signup"));
const Login = lazy(() => import("../views/auth/Login"));
const VerifyOTP = lazy(() => import("../views/auth/VerifyOTP"));
const ForgotPassword = lazy(() => import("../views/auth/ForgotPassword"));
const NewPassword = lazy(() => import("../views/auth/NewPassword"));
// const CompleteProfile = lazy(() => import("../views/auth/CompleteProfile"))

const MainPage = lazy(() => import("../views/website/Home"));
const DashboardProfile = lazy(() =>
  import("../views/dashboardPages/profile/Profile")
);
const UserEditProfile = lazy(() =>
  import("../views/dashboardPages/profile/EditProfile")
);
const UserEditEducation = lazy(() =>
  import("../views/dashboardPages/profile/EditEducation")
);
const UserEditProfessional = lazy(() =>
  import("../views/dashboardPages/profile/EditProfessional")
);
const OrganizationProfile = lazy(() =>
  import("../views/dashboardPages/organization/profile")
);
const Feed = lazy(() => import("../views/dashboardPages/Feed"));
const Connections = lazy(() => import("../views/dashboardPages/profile/Connections"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/verify-otp",
    element: <VerifyOTP />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/new-password",
    element: <NewPassword />,
  },
  // {
  //     path: "/complete-profile",
  //     element: <CompleteProfile />,
  // },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "",
        element: <Feed />,
      },
      {
        path: "profile",
        element: <DashboardProfile />,
      },
      {
        path: "connections",
        element: <Connections />,
      },
      {
        path: "profile/edit",
        element: <UserEditProfile />,
      },
      {
        path: "profile/professional/edit",
        element: <UserEditProfessional />,
      },
      {
        path: "profile/education/edit",
        element: <UserEditEducation />,
      },
      {
        path: "organization/profile",
        element: <OrganizationProfile />,
      },
    ],
  },
  {
    path: "*",
    element: <Login />,
  },
]);

const Routes = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loader coverFullScreen={true} />}>
        <RouterProvider router={router} />
      </Suspense>
    </ErrorBoundary>
  );
};

export default Routes;
