import { createBrowserRouter, RouterProvider } from "react-router-dom";

import React, { lazy, Suspense } from "react";
import ProtectedRoute from "./ProtectedRoute";
import Loader from "../components/loader/index";
// import Dashboard from "../views/layout/Dashboard";
// import UserProfile from "../views/layout/UserProfile";
// import Card from "../views/layout/Card";
import ErrorBoundary from "../components/errors/ErrorHandler";

const LandingPAgeApp = lazy(() => import("../views/index"));
const SignUp = lazy(() => import("../views/auth/Signup"));
const Login = lazy(() => import("../views/auth/Login"));
const VerifyOTP = lazy(() => import("../views/auth/VerifyOTP"));
const ForgotPassword = lazy(() => import("../views/auth/ForgotPassword"));
// const NewPassword = lazy(() => import("../views/auth/NewPassword"))
// const CompleteProfile = lazy(() => import("../views/auth/CompleteProfile"))
// const LoginSuccess = lazy(() => import("../views/auth/LoginSuccess"))

const MainPage = lazy(() => import("../views/website/Home"));
// const DashboardBlogs = lazy(() => import("../views/dashboardPages/Blogs"))
// const DashboardBlogsDetails = lazy(() => import("../views/dashboardPages/BlogsDetails"))
// const DashboardProfile = lazy(() => import("../views/dashboardPages/Profile"))
// const DashboardUpdates = lazy(() => import("../views/dashboardPages/UpdatesPage"))
// const DashboardAbout = lazy(() => import("../views/dashboardPages/About"))
// const DashboardColleges = lazy(() => import("../views/dashboardPages/Colleges"))
// const DashboardCollegeDetails = lazy(() => import("../views/dashboardPages/CollegeProfile"))

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
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <div className="min-h-screen w-full">
          <button
            className="p-4 bg-primary text-white"
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
          >
            Logout
          </button>
        </div>
      </ProtectedRoute>
    ),
  },
  // {
  //     path: "/new-password",
  //     element: <NewPassword />,
  // },
  // {
  //     path: "/complete-profile",
  //     element: <CompleteProfile />,
  // },
  // {
  //     path: "/login-success",
  //     element: <LoginSuccess />,
  // },
  // {
  //     path: "/home",
  //     element: <LandingPAgeApp />,
  // },
  // {
  //     path: "/dashboard",
  //     element: <Dashboard />,
  //     children: [
  //         {
  //             path: "/dashboard/colleges",
  //             element: <DashboardColleges />,
  //         },
  //         {
  //             path: "/dashboard/colleges/:collegeId",
  //             element: <DashboardCollegeDetails />,
  //         },
  //         {
  //             path: "/dashboard/blogs",
  //             element: <DashboardBlogs />,
  //         },
  //         {
  //             path: "/dashboard/blogs/:blogId",
  //             element: <DashboardBlogsDetails />,
  //         },
  //         {
  //             path: "/dashboard/updates",
  //             element: <DashboardUpdates />,
  //         },
  //     ],
  // },
  // {
  //     path: "/profile",
  //     element: <ProtectedRoute><DashboardProfile /></ProtectedRoute>,
  // },
  // {
  //     path: "/about",
  //     element: <DashboardAbout />,
  // },
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
