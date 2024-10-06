import React from "react";
import { useSelector } from "react-redux";

const ListOrganizations = () => {
  const organizations = useSelector((state) => state.organization);
  return (
    <div>
      <h1>List Organizations</h1>
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
