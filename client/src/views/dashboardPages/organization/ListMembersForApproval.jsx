import React, { useEffect, useState } from "react";
import { getMembersToApprove } from "../../../services/organizationService";
import { approveMember } from "../../../services/organizationService";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

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
            {members?.map((member) => (
              <li
                key={member?._id}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8"
              >
                <Member
                  member={member}
                  updateFn={fetchMembers}
                  loading={loading}
                  setLoading={setLoading}
                  organizationId={organizationId}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ListMemberToApprove;

const Member = ({ member, updateFn, loading, setLoading, organizationId }) => {
  const navigate = useNavigate();
  const loggedInUser = useSelector((state) => state.user);
  const handleApproveMember = async (memberId) => {
    try {
      setLoading(true);
      const response = await approveMember(organizationId, memberId);
      if (response?.status >= 200 && response?.status < 300) {
        updateFn();
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div
      key={member._id}
      className="rounded-xl shadow-lg bg-white/60 p-4 backdrop-blur-2xl flex items-center justify-center flex-col"
    >
      {member?.userId?._id === loggedInUser?._id && (
        <h1 className="absolute top-4 right-4 border rounded-full px-2 border-primary bg-primary bg-opacity-5 text-primary text-xs">
          You
        </h1>
      )}

      <img
        src={
          member?.userId?.profilePicture ||
          "https://static.vecteezy.com/system/resources/previews/000/422/799/original/avatar-icon-vector-illustration.jpg"
        }
        alt={`${member?.userId?.firstName} ${member?.userId?.lastName}`}
        className="w-12 h-12 rounded-full mr-4"
      />
      <div className="flex items-center">
        <div>
          <h2 className="text-lg font-semibold text-center">
            {member?.userId?.firstName} {member?.userId?.lastName}
          </h2>
          <h2 className="text-center font-medium">
            {member?.userId?.introLine || "Alumns User"}
          </h2>
        </div>
      </div>
      <button
        onClick={() => {
          navigate(`/dashboard/profile/${member?.userId?._id}`);
        }}
        className="text-primary border-2 border-primary text-sm px-4 py-2 rounded-md hover:bg-gray-100 mt-4 w-full"
      >
        View Profile
      </button>
      <button
        onClick={() => {
          handleApproveMember(member?.userId?._id);
        }}
        className="text-white bg-primary text-sm px-4 py-2 rounded-md hover:bg-blue-800 mt-4 w-full"
      >
        Approve
      </button>
    </div>
  );
};
