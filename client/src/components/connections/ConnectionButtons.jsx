import React from "react";
import { toast } from "react-toastify";
import {
  acceptConnectionRequest,
  rejectConnectionRequest,
  sendConnectionRequest,
} from "../../services/connectionService";

const ConnectionButtons = ({user, updateFn}) => {
  console.log(user)

  const handleSendRequest = async (receiverId) => {
    try {
      const response = await sendConnectionRequest({ receiverId });
      if (response.status >= 200 && response.status < 300) {
        toast.success("Connection request sent successfully");
        updateFn(); // Refresh the users list
      }
    } catch (error) {
      console.error("Error sending connection request:", error);
    }
  };

  const handleCancelRequest = async (connectionId) => {
    console.log(connectionId)
    try {
      const response = await rejectConnectionRequest({ connectionId });
      if (response.status >= 200 && response.status < 300) {
        toast.success("Connection request cancelled successfully");
        updateFn(); // Refresh the users list
      }
    } catch (error) {
      console.error("Error cancelling connection request:", error);
    }
  };

  const handleAcceptRequest = async (connectionId) => {
    try {
      const response = await acceptConnectionRequest({ connectionId });
      if (response.status >= 200 && response.status < 300) {
        toast.success("Connection request accepted successfully");
        updateFn(); // Refresh the users list
      }
    } catch (error) {
      console.error("Error accepting connection request:", error);
    }
  };

  return (
    <div className="mt-4 space-x-2">
      {user?.connectionStatus === "none" && (
        <button
          onClick={() => handleSendRequest(user?._id)}
          className="text-white bg-primary text-sm px-4 py-2 rounded-md hover:bg-blue-800"
        >
          Send Request
        </button>
      )}

      {user?.connectionStatus === "pending" &&
        user?.actionRequired === "accept" && (
          <button
            onClick={() => handleAcceptRequest(user?.connectionId)}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 text-sm"
          >
            Accept Request
          </button>
        )}

      {user?.connectionStatus === "pending" &&
        user?.actionRequired === "waiting" && (
          <button
            onClick={() => handleCancelRequest(user?.connectionId)}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 text-sm"
          >
            Cancel Request
          </button>
        )}

      {user?.connectionStatus === "pending" &&
        user?.actionRequired === "accept" && (
          <button
            onClick={() => handleCancelRequest(user?.connectionId)}
            className="bg-white border-2 border-red-500 px-3 text-red-500 py-1.5 rounded-md hover:bg-gray-200 text-sm"
          >
            Deny Request
          </button>
        )}

      {user?.connectionStatus === "accepted" && (
        <button
          onClick={() => handleCancelRequest(user?.connectionId)}
          className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 text-sm "
        >
          Remove Connection
        </button>
      )}
    </div>
  );
};

export default ConnectionButtons;
