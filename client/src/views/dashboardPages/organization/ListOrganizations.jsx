import React from "react";
import { useSelector } from "react-redux";

const ListOrganizations = () => {
  const organizations = useSelector((state) => state.organization);
  return (
    <div className="py-5">
      <h2 className="text-xl mb-4 font-regular">Organization</h2>
      <ul>
        {organizations?.organizationData?.map((org) => {
          console.log(org);
          return <li key={org._id}>{org.organizationId.name}</li>;
        })}
      </ul>
    </div>
  );
};

export default ListOrganizations;
