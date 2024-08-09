import React from "react";
import { Outlet} from "react-router-dom";
import Footer from "../../components/shared/Footer";
import Header from "../../components/shared/Header";
import { useSelector } from "react-redux";
import ProtectedRoute from "../../Routes/ProtectedRoute";

export default function Dashboard() {
  const user = useSelector((state) => state?.user);
  console.log(user, "user");
  return (
    <ProtectedRoute>
      <div className="w-full ">
        <Header />
        <div className="bg-gray-100 min-h-screen">
          <div className="mx-auto container">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}
