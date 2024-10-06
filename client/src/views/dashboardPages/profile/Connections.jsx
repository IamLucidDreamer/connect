import React, { useState, useEffect } from "react";
import { getConnectionRequests } from "../../../services/connectionService";

const ConnectionsList = () => {
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("accepted");

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        setLoading(true);
        const response = await getConnectionRequests(status);
        if (response?.status >= 200 && response?.status < 300) {
          setConnections(response?.data);
        }
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch connections");
        setLoading(false);
      }
    };

    fetchConnections();
  }, [status]);

  console.log(connections);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="py-5">
      <h2 className="text-xl mb-4 font-regular">Connections</h2>
      <div className="gap-6 flex">
        <button
          onClick={() => setStatus("accepted")}
          className={`text-xs md:text-base px-3 py-1 md:px-4 md:py-2 ${
            status === "accepted"
              ? "bg-primary text-white rounded-lg"
              : "border-b border-primary bg-transparent text-primary"
          }`}
        >
          Connections
        </button>
        <button
          onClick={() => setStatus("pending")}
          className={`text-xs md:text-base px-3 py-1 md:px-4 md:py-2 ${
            status === "pending"
              ? "bg-primary text-white rounded-lg"
              : "border-b border-primary bg-transparent text-primary"
          }`}
        >
          Pending
        </button>
        <button
          onClick={() => setStatus("recieved")}
          className={`text-xs md:text-base px-3 py-1 md:px-4 md:py-2 ${
            status === "recieved"
              ? "bg-primary text-white rounded-lg"
              : "border-b border-primary bg-transparent text-primary"
          }`}
        >
          Recieved
        </button>
      </div>
      {loading ? (
        <div className="flex items-center justify-center ">
          <p className="text-xl text-gray-700 mt-40">Loading...</p>
        </div>
      ) : connections?.length === 0 ? (
        <div className="flex items-center justify-center ">
          <p className="text-xl text-gray-700 mt-40">No connections found...</p>
        </div>
      ) : (
        <ul>
          {connections?.map((connection) => (
            <li key={connection?._id}>
              <ConnectionItem connection={connection} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const ConnectionItem = ({ connection }) => {
  const { sender, receiver, status, blocked } = connection;

  const otherUser = receiver;

  return (
    <div className="border p-4 my-5 bg-white rounded shadow-md">
      <h3>
        {otherUser.firstName} {otherUser?.lastName}
      </h3>
      <p>Email: {otherUser?.email}</p>
      <p>Status: {status}</p>
      {blocked && <p style={{ color: "red" }}>This connection is blocked</p>}
    </div>
  );
};

export default ConnectionsList;
