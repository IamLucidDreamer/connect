import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import server from "../../../helpers/apiCall";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../store/actions/userActions";
import { useNavigate } from "react-router-dom";
import formatDateToMonthYear from "../../../helpers";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user);
  const [showTab, setShowTab] = useState(1);

  // Fetch user details from the server
  const getUserDetails = () => {
    server
      .get(`/user/${user?._id}`)
      .then((res) => {
        dispatch(setUser(res.data?.data?.user));
      })
      .catch((err) => {
        toast.error(err?.response?.data?.error || "Something went Wrong");
        console.log(err);
      });
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
          <div className="col-span-4 sm:col-span-3">
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex flex-col items-center">
                <img
                  src={
                    user?.profileImage ||
                    "https://randomuser.me/api/portraits/men/94.jpg"
                  }
                  className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                  alt="Profile"
                />
                <h1 className="text-xl font-bold">
                  {`${user?.firstName || ""} ${user?.middleName || ""} ${
                    user?.lastName || ""
                  }`}
                </h1>
                <p className="text-gray-700">
                  {user?.designation || "Software Developer"}
                </p>
                <div className="mt-6 flex flex-wrap gap-4 justify-center">
                  <a
                    href={`mailto:${user?.email}`}
                    className="border-b border-primary px-2 text-primary"
                  >
                    Contact
                  </a>
                </div>
              </div>
              <hr className="my-6 border-t border-gray-300" />
              <div className="flex flex-col">
                <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">
                  Skills
                </span>
                <ul>
                  {user?.skills?.length > 0 ? (
                    user.skills.map((skill, index) => (
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
            <div className="flex items-center justify-between mb-5 gap-4">
              <button
                onClick={() => setShowTab(1)}
                className="bg-primary text-xs md:text-base px-3 py-1 md:px-4 md:py-2 rounded-lg text-white"
              >
                Personal Details
              </button>
              <button
                onClick={() => setShowTab(2)}
                className="bg-primary text-xs md:text-base px-3 py-1 md:px-4 md:py-2 rounded-lg text-white"
              >
                Professional Details
              </button>
              <button
                onClick={() => setShowTab(3)}
                className="bg-primary text-xs md:text-base px-3 py-1 md:px-4 md:py-2 rounded-lg text-white"
              >
                Education Details
              </button>
            </div>
            <div className="bg-white shadow rounded-lg p-6">
              {showTab === 1 && (
                <>
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold mt-6 mb-4">About</h2>
                    <button
                      onClick={() => navigate("/dashboard/profile/edit")}
                      className="bg-transparent px-2 py-1 text-sm border border-primary rounded-lg text-primary"
                    >
                      Edit
                    </button>
                  </div>
                  {user?.bio ? (
                    <p className="text-gray-700">{user?.bio}</p>
                  ) : (
                    <button
                      className="px-4 py-2 bg-primary text-white rounded-md mx-auto"
                      onClick={() => navigate("/dashboard/profile/edit")}
                    >
                      Add Bio
                    </button>
                  )}
                  <hr className="my-6 border-t border-gray-300" />
                  <h2 className="text-xl font-semibold mt-6 mb-4">Personal Info</h2>
                  {user?.gender && (
                    <p className="text-gray-700">Gender : {user?.gender}</p>
                  )}

                  {user?.dateOfBirth && (
                    <p className="text-gray-700">
                      D.O.B : {user?.dateOfBirth.split("T")[0]}
                    </p>
                  )}
                  {user?.dateOfBirth && (
                    <p className="text-gray-700">
                      D.O.B : {user?.dateOfBirth.split("T")[0]}
                    </p>
                  )}
                  <h3 className="font-semibold text-center mt-3 -mb-2">
                    Find me on
                  </h3>
                  <div className="flex justify-center items-center gap-6 my-6">
                    {user?.socialLinks?.linkedin && (
                      <a
                        className="text-gray-700 hover:text-orange-600"
                        aria-label="Visit LinkedIn"
                        href={user.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                          className="h-6"
                        >
                          <path
                            fill="currentColor"
                            d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"
                          ></path>
                        </svg>
                      </a>
                    )}
                    {user?.socialLinks?.twitter && (
                      <a
                        className="text-gray-700 hover:text-orange-600"
                        aria-label="Visit Twitter"
                        href={user.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg
                          className="h-6"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path
                            fill="currentColor"
                            d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
                          ></path>
                        </svg>
                      </a>
                    )}
                    {user?.socialLinks?.github && (
                      <a
                        className="text-gray-700 hover:text-orange-600"
                        aria-label="Visit GitHub"
                        href={user.socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                          className="h-6"
                        >
                          <path
                            fill="currentColor"
                            d="M224 0C100.3 0 0 100.3 0 224c0 99 64.3 182.8 153.6 212.4 11.2 2.1 15.3-4.8 15.3-10.7v-37.5c-62.5 13.5-75.7-30.2-75.7-30.2-10.2-25.9-24.9-32.8-24.9-32.8-20.4-13.9 1.6-13.6 1.6-13.6 22.5 1.6 34.3 23.1 34.3 23.1 20 34.3 52.5 24.4 65.3 18.7 2-14.5 7.8-24.4 14.2-30-49.9-5.7-102.4-25-102.4-111.3 0-24.6 8.8-44.8 23.3-60.6-2.3-5.7-10.1-28.6 2.2-59.7 0 0 19.1-6.1 62.5 23.3 18.2-5.1 37.6-7.6 56.9-7.7 19.3.1 38.7 2.6 56.9 7.7 43.3-29.4 62.5-23.3 62.5-23.3 12.3 31.1 4.5 54 2.2 59.7 14.4 15.8 23.3 36 23.3 60.6 0 86.6-52.5 105.5-102.6 111.1 8 6.9 15.3 20.5 15.3 41.3v61.3c0 5.9 4 12.8 15.3 10.7C383.7 406.8 448 323 448 224 448 100.3 347.7 0 224 0z"
                          ></path>
                        </svg>
                      </a>
                    )}
                  </div>
                </>
              )}
              {showTab === 2 && (
                <>
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold mt-6 mb-4">Experience</h2>
                    {user?.professional?.length > 0 && (
                      <button
                        onClick={() =>
                          navigate("/dashboard/profile/professional/edit")
                        }
                        className="bg-transparent px-2 py-1 text-sm border border-primary rounded-lg text-primary"
                      >
                        Edit
                      </button>
                    )}
                  </div>
                  {user?.professional?.length > 0 ? (
                    user.professional.map((prof) => (
                      <li key={prof._id} className="mb-4 list-none">
                        <p className="text-gray-700">
                          <strong>{prof.currentEmployment}</strong> -{" "}
                          {prof.designation} at {prof.companyName}
                          <br />
                          {formatDateToMonthYear(prof.startYear)} to{" "}
                          {formatDateToMonthYear(prof.completionYear) ||
                            "Present"}
                          <br />
                          Employment Type: {prof.employmentType},
                          <br />
                          Location: {prof.location}
                          <br />
                          Salary Band: {prof.salaryBand || "N/A"}
                        </p>
                      </li>
                    ))
                  ) : (
                    <button
                      className="px-4 py-2 bg-primary text-white rounded-md mx-auto"
                      onClick={() =>
                        navigate("/dashboard/profile/professional/edit")
                      }
                    >
                      Add Experience
                    </button>
                  )}
                </>
              )}
              {showTab === 3 && (
                <>
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold mt-6 mb-4">Education</h2>
                    {user?.education?.length > 0 && (
                      <button
                        onClick={() =>
                          navigate("/dashboard/profile/education/edit")
                        }
                        className="bg-transparent px-2 py-1 text-sm border border-primary rounded-lg text-primary"
                      >
                        Edit
                      </button>
                    )}
                  </div>
                  {user?.education?.length > 0 ? (
                    user.education.map((edu) => (
                      <li key={edu._id} className="mb-4 list-none">
                        <p className="text-gray-700">
                          <strong>{edu.qualification}</strong> - {edu.program}{" "}
                          in {edu.specialization}
                          <br />
                          {formatDateToMonthYear(edu.startYear)} to{" "}
                          {formatDateToMonthYear(edu.completionYear) ||
                            "Present"}
                          <br />
                          University/Board: {edu.university}
                          <br />
                          Institute: {edu.institute}
                          <br />
                          Percentage/CGPA: {edu.percentageOrCGPA}
                        </p>
                      </li>
                    ))
                  ) : (
                    <button
                      className="px-4 py-2 bg-primary text-white rounded-md mx-auto"
                      onClick={() =>
                        navigate("/dashboard/profile/education/edit")
                      }
                    >
                      Add Education
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
