import React, { useState, useEffect } from "react";
import { getConnectionRequests } from "../../../services/connectionService";
import ConnectionButtons from "../../../components/connections/ConnectionButtons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ConnectionsList = () => {
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("accepted");

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
    fetchConnections();
  }, [status]);

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
      <div>
        {loading ? (
          <div className="flex items-center justify-center ">
            <p className="text-xl text-gray-700 mt-40">Loading...</p>
          </div>
        ) : connections?.length === 0 ? (
          <div className="flex items-center justify-center ">
            <p className="text-xl text-gray-700 mt-40">
              No connections found...
            </p>
          </div>
        ) : (
          <ul>
            {connections?.map((connection) => (
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

const ConnectionItem = ({ connection, updateFn }) => {
  const navigate = useNavigate();
  const loggedInUser = useSelector((state) => state.user);

  return (
    <div
      key={connection._id}
      className="rounded-xl shadow-lg bg-white/60 p-4 backdrop-blur-2xl flex items-center justify-center flex-col"
    >
      {connection?.connectionData?._id === loggedInUser?._id && (
        <h1 className="absolute top-4 right-4 border rounded-full px-2 border-primary bg-primary bg-opacity-5 text-primary text-xs">
          You
        </h1>
      )}

      <img
        src={
          connection?.connectionData?.profilePicture ||
          "https://static.vecteezy.com/system/resources/previews/000/422/799/original/avatar-icon-vector-illustration.jpg"
        }
        alt={`${connection?.connectionData?.firstName} ${connection?.connectionData?.lastName}`}
        className="w-12 h-12 rounded-full mr-4"
      />
      <div className="flex items-center">
        <div>
          <h2 className="text-lg font-semibold text-center">
            {connection?.connectionData?.firstName}{" "}
            {connection?.connectionData?.lastName}
          </h2>
          <h2 className="text-center font-medium">
            {connection?.connectionData?.introLine || "Alumns User"}
          </h2>
          <p className="text-gray-500 capitalize text-center">
            {connection?.connectionData?._id !== loggedInUser._id &&
              `Connection :
                  ${
                    connection?.status === "none"
                      ? "Not Connected"
                      : connection?.status
                  }`}
          </p>
        </div>
      </div>
      {connection?.connectionData?._id !== loggedInUser._id ? (
        <ConnectionButtons
          user={{ ...connection, connectionStatus: connection?.status }}
          updateFn={updateFn}
        />
      ) : (
        <button
          onClick={() => {
            navigate(`/dashboard/profile`);
          }}
          className="text-white bg-primary text-sm px-4 py-2 rounded-md hover:bg-blue-800 mt-4"
        >
          View Profile
        </button>
      )}
    </div>
  );
};

export default ConnectionsList;
