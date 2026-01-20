import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

function HomeOperator() {
    const navigate = useNavigate();
    const { user, signOut } = useAuth();

    return (
        <div className="space-y-3">
            <h1 className="text-xl font-semibold">Operator Home</h1>

            <div className="space-y-1">
                <div>
                    <span className="font-medium">username:</span> {user?.username ?? "-"}
                </div>
                <div>
                    <span className="font-medium">email:</span> {user?.email ?? "-"}
                </div>
                <div>
                    <span className="font-medium">full_name:</span> {user?.full_name ?? "-"}
                </div>
                <div>
                    <span className="font-medium">role:</span> {user?.role ?? "-"}
                </div>
            </div>

            <button
                className="px-4 py-2 bg-gray-900 text-white rounded"
                onClick={async () => {
                    await signOut();
                    navigate("/", { replace: true });
                }}
            >
                Sign out
            </button>
        </div>
    );
}

export default HomeOperator;
