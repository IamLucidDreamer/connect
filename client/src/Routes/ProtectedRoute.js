import { useSelector } from 'react-redux';
import { getAuthToken, redirectToLogin } from '../helpers/auth';

function ProtectedRoute({ children }) {
    const user = useSelector(state => state.user);
    try {
        const authToken = getAuthToken();
        
        console.log(user , "user")
        if (authToken && authToken.length > 0) {
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
