import React from "react";
import { useSelector } from "react-redux";

const ListOrganizations = () => {
  const organizations = useSelector((state) => state.organization);
  return (
    <div className="py-5">
      <h2 className="text-xl mb-4 font-regular">Organization</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
        {organizations?.organizationData?.map((org) => {
          console.log(org);
          return <OrgCard org={org} />;
        })}
      </ul>
    </div>
  );
};

export default ListOrganizations;

const OrgCard = ({ org }) => {
  console.log(org);
  return (
    <div
      key={org._id}
      className="rounded-xl shadow-lg bg-white/60 p-4 backdrop-blur-2xl flex items-center justify-center flex-col"
    >
      {org?.role === "admin" && (
        <h1 className="absolute top-4 right-4 border rounded-full px-2 border-red-500 bg-red-50 bg-opacity-5 text-red-500 text-xs">
          Admin
        </h1>
      )}
      <img
        src={
          org?.icon ||
          "https://cdn4.vectorstock.com/i/1000x1000/77/43/organization-icon-vector-23027743.jpg"
        }
        alt={`${org?.name}`}
        className="w-12 h-12 rounded-full mr-4 object-cover"
      />
      <div className="flex items-center">
        <div>
          <h2 className="text-lg font-semibold text-center">
            {org.organizationId?.name} 
          </h2>
        </div>
      </div>
      <button className="mt-4 border-2 border-primary text-primary rounded-md p-1 px-2">
        Edit Details
      </button>
    </div>
  );
};
