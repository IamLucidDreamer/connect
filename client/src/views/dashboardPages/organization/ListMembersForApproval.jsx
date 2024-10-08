import React, { useEffect, useState } from "react";
import { getMembersToApprove } from "../../../services/organizationService";
import { approveMember } from "../../../services/organizationService";

const ListMemberToApprove = ({ organizationId }) => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const response = await getMembersToApprove(organizationId);
      if (response?.status >= 200 && response?.status < 300) {
        setMembers(response?.data?.data);
        console.log(response?.data?.data, "Connections");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleApproveMember = async (memberId) => {
    try {
      setLoading(true);
      const response = await approveMember(organizationId, memberId);
      if (response?.status >= 200 && response?.status < 300) {
        fetchMembers();
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <div className="py-5">
      <h2 className="text-xl mb-4 font-regular">Members waiting Approval</h2>
      <div>
        {loading ? (
          <div className="flex items-center justify-center ">
            <p className="text-xl text-gray-700 mt-40">Loading...</p>
          </div>
        ) : members?.length === 0 ? (
          <div className="flex items-center justify-center ">
            <p className="text-xl text-gray-700 mt-40">No Members found...</p>
          </div>
        ) : (
          <ul>
            {members?.map((connection) => (
              <li
                key={connection?._id}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8"
              >
                {/* <ConnectionItem
                  connection={connection}
                  updateFn={fetchMembers}
                /> */}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ListMemberToApprove;
