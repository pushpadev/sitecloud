import { Navigate, Outlet } from "react-router-dom";
import PrimarySearchAppBar from '../components/appbar';


const useAuth = () => {
    const user = { loggedIn: true };
    return user && user.loggedIn;
};

const ProtectedRoutes = () => {
    const isAuth = useAuth();
    return isAuth ?
        (<>

            <PrimarySearchAppBar />
            <Outlet />

        </>)
        : <Navigate to="/" />;
};

export default ProtectedRoutes;