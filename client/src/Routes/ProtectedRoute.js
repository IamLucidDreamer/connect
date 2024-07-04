import { getAuthToken, redirectToLogin } from '../helpers/auth';

function ProtectedRoute({ children }) {
    try {
        const authToken = getAuthToken();
        if (authToken) {
            return <>{children}</>;
        }
        redirectToLogin()
        return null;
    } catch (error) {
        console.error("Error : ", error);
        redirectToLogin();
        return null;
    }
}

export default ProtectedRoute;
