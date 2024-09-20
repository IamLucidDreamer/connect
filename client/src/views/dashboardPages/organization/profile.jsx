import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import server from "../../../helpers/apiCall";
import { useDispatch, useSelector } from "react-redux";
// import { setOrganization } from "../../../store/actions/organizationActions";
// import EditOrganizationDetails from "./EditOrganizationDetails";

const OrganizationProfile = () => {
  const dispatch = useDispatch();
  const organization = {
    "location": {
        "country": "USA",
        "city": "New York"
    },
    "_id": "66ed170798647bfd11ba1862",
    "name": "Testing Org New",
    "type": "Corporate",
    "email": "govow85971@ofionk.com",
    "website": "https://org1.com",
    "contactNumber": "+123456789",
    "establishmentYear": 2001,
    "registeredGovtId": "ID001",
    "industry": "Technology",
    "createdAt": "2024-09-20T06:32:39.471Z",
    "updatedAt": "2024-09-20T06:32:39.471Z",
    "__v": 0,
    "isAdmin": true
}
  const [showTab, setShowTab] = useState(1);

  // Fetch organization details from the server
//   const getOrganizationDetails = async () => {
//     // const response = await getOrganizationDetails(organizationId);
//     if (response.status === 200) {
//     //   dispatch(setOrganization(response.data.data));
//     } else {
//       toast.error("Failed to fetch organization details");
//     }
//   };

//   useEffect(() => {
//     getOrganizationDetails();
//   }, []);

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
          <div className="col-span-4 sm:col-span-3">
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex flex-col items-center">
                <img
                  src={organization?.logo || "https://via.placeholder.com/150"}
                  className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                  alt="Organization Logo"
                />
                <h1 className="text-xl font-bold">
                  {organization?.name || "Organization Name"}
                </h1>
                <p className="text-gray-700">
                  {organization?.industry || "Add Industry"}
                </p>
                <div className="mt-6 flex flex-wrap gap-4 justify-center">
                  <a
                    href={organization?.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-b border-primary px-2 text-primary"
                  >
                    Website
                  </a>
                  <a
                    href={`mailto:${organization?.email}`}
                    className="border-b border-primary px-2 text-primary"
                  >
                    Contact
                  </a>
                </div>
              </div>
              <hr className="my-6 border-t border-gray-300" />
              <div className="flex flex-col">
                <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">
                  Location
                </span>
                <p className="text-gray-700">
                  {organization?.location?.city},{" "}
                  {organization?.location?.country}
                </p>
                <p className="text-gray-700">
                  {organization?.location?.address || "No address provided"}
                </p>
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
                  Organization Details
                </button>
                <button
                  onClick={() => setShowTab(2)}
                  className={`text-xs md:text-base px-3 py-1 md:px-4 md:py-2 ${
                    showTab === 2
                      ? "bg-primary text-white rounded-lg"
                      : "border-b border-primary bg-transparent text-primary"
                  }`}
                >
                  Contact Information
                </button>
              </div>
              {/* {showTab === 1 && (
                <EditOrganizationDetails organization={organization} />
              )}
              {showTab === 2 && (
                <EditOrganizationContact organization={organization} />
              )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationProfile;
