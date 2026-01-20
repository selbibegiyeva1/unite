import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function ProtectedRoute() {
    const { user, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) return null; // or loader

    if (!user) {
        return <Navigate to="/" replace state={{ from: location.pathname }} />;
    }

    return <Outlet />;
}
