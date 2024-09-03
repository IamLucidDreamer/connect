import axios from "axios";
import { setAuthToken, setRefreshToken } from "./auth";
import { toast } from "react-toastify";

export const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/auth/refresh-token`, { token : refreshToken })
    const { accessToken, refreshToken : newRefreshToken} = response.data?.data;
    setAuthToken(accessToken);
    setRefreshToken(newRefreshToken);
    return accessToken;
  } catch (error) {
    toast.error(parseErrorMessage(error));
    console.error("Error refreshing token", error);
    localStorage.clear();
    window.location.href = "/login";
    return null;
  }
};

export const parseErrorMessage = (error) => {
  let message = "An unexpected error occurred. Please try again later.";

  if (error.response && error.response.data) {
    const { data } = error.response;

    if (data.message) {
      message = data.message;
    } else if (data.errors) {
      if (Array.isArray(data.errors) && data.errors.length > 0) {
        message = data.errors
          .map((err) => err.msg || err.message || "Validation error")
          .join(", ");
      } else if (typeof data.errors === "object") {
        message = Object.values(data.errors).join(", ");
      }
    }
  } else if (error.message) {
    message = error.message;
  }

  return message;
};

