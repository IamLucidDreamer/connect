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
const OrganizationProfile = lazy(() =>
  import("../views/dashboardPages/organization/profile")
);
const OrganizationsList = lazy(() =>
  import("../views/dashboardPages/organization/ListOrganizations")
);
const Feed = lazy(() => import("../views/dashboardPages/Feed"));
const PostCreate = lazy(() =>
  import("../views/dashboardPages/post/CreatePost")
);
const Connections = lazy(() =>
  import("../views/dashboardPages/profile/Connections")
);
const Search = lazy(() => import("../views/dashboardPages/Search"));

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
        path: "profile/:userId",
        element: <DashboardProfile />,
      },
      {
        path: "connections",
        element: <Connections />,
      },

      {
        path: "search",
        element: <Search />,
      },
      {
        path: "organization/profile/:organizationId",
        element: <OrganizationProfile />,
      },
      {
        path: "organization/list",
        element: <OrganizationsList />,
      },
      {
        path: "post/create",
        element: <PostCreate />,
      },
      {
        path: "post/create/:postId",
        element: <PostCreate />,
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
