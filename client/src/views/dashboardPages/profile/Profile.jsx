import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import server from "../../../helpers/apiCall";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../store/actions/userActions";
import EditEducation from "./EditEducation";
import EditProfession from "./EditProfessional";
import EditProfile from "./EditProfile";
import { useParams } from "react-router-dom";
import ConnectionButtons from "../../../components/connections/ConnectionButtons";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user);
  const { userId: userIdFromParams } = useParams();
  const [showTab, setShowTab] = useState(1);
  const [userData, setUserData] = useState(userIdFromParams ? null : user);
  const [loading, setLoading] = useState(false);

  const isLoggedInUser = userIdFromParams !== user?._id ? false : true;

  // Fetch user details from the server
  const getUserDetails = () => {
    setLoading(true);
    server
      .get(`/user/${userIdFromParams ? userIdFromParams : user?._id}`)
      .then((res) => {
        setUserData(res.data?.data?.user);
        if (!userIdFromParams) {
          dispatch(setUser(res.data?.data?.user));
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.error || "Something went Wrong");
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getUserDetails();
  }, [userIdFromParams]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
          <div className="col-span-4 sm:col-span-3">
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex flex-col items-center">
                <img
                  src={
                    userData?.profileImage ||
                    "https://static.vecteezy.com/system/resources/previews/000/422/799/original/avatar-icon-vector-illustration.jpg"
                  }
                  className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                  alt="Profile"
                />
                <h1 className="text-xl font-bold">
                  {`${userData?.firstName || ""} ${
                    userData?.middleName || ""
                  } ${userData?.lastName || ""}`}
                </h1>
                <p className="text-gray-700">
                  {userData?.introLine || "Add Intro Line"}
                </p>
                <div className="mt-6 flex flex-wrap gap-4 justify-center">
                  {isLoggedInUser ? (
                    <a
                      href={`mailto:${userData?.email}`}
                      className="border-b border-primary px-2 text-primary"
                    >
                      Contact
                    </a>
                  ) : (
                    <ConnectionButtons
                      user={userData}
                      updateFn={getUserDetails}
                    />
                  )}
                </div>
              </div>
              <hr className="my-6 border-t border-gray-300" />
              <div className="flex flex-col">
                <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">
                  Skills
                </span>
                <ul>
                  {userData?.skills?.length > 0 ? (
                    userData?.skills.map((skill, index) => (
                      <li key={index} className="mb-2">
                        {skill}
                      </li>
                    ))
                  ) : (
                    <p className="text-gray-700">No skills listed</p>
                  )}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-span-4 sm:col-span-9">
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center justify-between mb-5 gap-4">
                <button
                  onClick={() => setShowTab(1)}
                  className={`text-xs md:text-base px-3 py-1 md:px-4 md:py-2 ${
                    showTab === 1
                      ? "bg-primary text-white rounded-lg"
                      : "border-b border-primary bg-transparent text-primary"
                  }`}
                >
                  Personal Details
                </button>
                <button
                  onClick={() => setShowTab(2)}
                  className={`text-xs md:text-base px-3 py-1 md:px-4 md:py-2 ${
                    showTab === 2
                      ? "bg-primary text-white rounded-lg"
                      : "border-b border-primary bg-transparent text-primary"
                  }`}
                >
                  Professional Details
                </button>
                <button
                  onClick={() => setShowTab(3)}
                  className={`text-xs md:text-base px-3 py-1 md:px-4 md:py-2 ${
                    showTab === 3
                      ? "bg-primary text-white rounded-lg"
                      : "border-b border-primary bg-transparent text-primary"
                  }`}
                >
                  Education Details
                </button>
              </div>
              {showTab === 1 && <EditProfile />}
              {showTab === 2 && <EditProfession user={userData} />}
              {showTab === 3 && <EditEducation user={userData} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
