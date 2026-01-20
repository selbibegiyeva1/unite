import { Outlet } from "react-router-dom";
import ProtectedNavbar from "./ProtectedNavbar";

function ProtectedLayout() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <ProtectedNavbar />
            <main className="flex-1 w-full px-6">
                <Outlet />
            </main>
        </div>
    );
}

export default ProtectedLayout;
