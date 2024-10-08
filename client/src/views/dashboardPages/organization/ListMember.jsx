import React, { useState } from "react";

const ListMember = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchConnections = async () => {
    try {
      setLoading(true);
      const response = await getConnectionRequests(status);
      if (response?.status >= 200 && response?.status < 300) {
        setConnections(response?.data?.data);
        console.log(response?.data?.data, "Connections");
      }
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch connections");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [status]);

  return (
    <div className="py-5">
      <h2 className="text-xl mb-4 font-regular">Connections</h2>
      <div>
        {loading ? (
          <div className="flex items-center justify-center ">
            <p className="text-xl text-gray-700 mt-40">Loading...</p>
          </div>
        ) : members?.length === 0 ? (
          <div className="flex items-center justify-center ">
            <p className="text-xl text-gray-700 mt-40">
              No Members found...
            </p>
          </div>
        ) : (
          <ul>
            {members?.map((connection) => (
              <li
                key={connection?._id}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8"
              >
                <ConnectionItem
                  connection={connection}
                  updateFn={fetchConnections}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ListMember;
