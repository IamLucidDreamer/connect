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
        setConnections(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch connections");
        setLoading(false);
      }
    };

    fetchConnections();
  }, [status]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="py-5">
      <h2 className="text-2xl mb-4 font-medium">Connections</h2>
      <div className="gap-4 flex">
        <button
          onClick={() => setStatus("accepted")}
          className={`border-b pb-1 ${
            status === "accepted" ? "border-primary" : "border-transparent"
          }`}
        >
          Connections
        </button>
        <button
          onClick={() => setStatus("pending")}
          className={`border-b pb-1 ${
            status === "pending" ? "border-primary" : "border-transparent"
          }`}
        >
          Pending
        </button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : connections.length === 0 ? (
        <p>No connections found.</p>
      ) : (
        <ul>
          {connections.map((connection) => (
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
