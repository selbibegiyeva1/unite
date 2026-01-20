import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

function ProtectedNavbar() {
    const navigate = useNavigate();
    const { signOut } = useAuth();

    const handleSignOut = async () => {
        await signOut();
        navigate("/", { replace: true });
    };

    return (
        <nav>
            <div className="flex items-center justify-between p-6">
                <div className="flex items-center space-x-8">
                    <Link to="/operator/home" className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-gray-900">Unite Shop</span>
                    </Link>
                    <div>
                        <Link
                            to="/operator/home"
                            className="text-gray-700 px-3 py-2"
                        >
                            Home
                        </Link>
                        <Link
                            to="/operator/product"
                            className="text-gray-700 px-3 py-2"
                        >
                            Products
                        </Link>
                    </div>
                </div>
                <div className="flex items-center">
                    <button
                        onClick={handleSignOut}
                        className="px-4 py-2 bg-gray-900 text-white rounded-md"
                    >
                        Sign Out
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default ProtectedNavbar;
