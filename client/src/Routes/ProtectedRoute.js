import { useSelector } from "react-redux";
import { getAuthToken, redirectToLogin } from "../helpers/auth";
import { useEffect } from "react";
import { getUser } from "../services/userService";
import { toast } from "react-toastify";
import { parseErrorMessage } from "../helpers/apiCallHerlper";

function ProtectedRoute({ children }) {
  const user = useSelector((state) => state.user);
  const getUpdatedUser = async () => {
    try {
      const response = await getUser(user.id);
      if (response.status >= 200 && response.status < 300) {
        console.log(response.data, "response");
      }
    } catch (error) {
      console.log(error, "error");
      toast.error(parseErrorMessage(error));
    }
  };

  useEffect(() => {
    window.addEventListener("focus", (event) => {
      if (user && user.id) {
        getUpdatedUser();
      }
    });
    return () => {
      window.removeEventListener("focus", (event) => {
        if (user && user.id) {
          getUpdatedUser();
        }
      });
    };
  }, [user]);

  try {
    const authToken = getAuthToken();

    if (authToken && authToken.length > 0) {
      return <>{children}</>;
    }
    redirectToLogin();
    return null;
  } catch (error) {
    console.error("Error : ", error);
    redirectToLogin();
    return null;
  }
}

export default ProtectedRoute;
