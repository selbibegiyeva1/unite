import { useAuth } from '../../contexts/AuthContext';

function HomeOperator() {
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="px-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Home Operator</h1>
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                >
                    Logout
                </button>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-4">User Information</h2>
                <div className="space-y-2">
                    <div>
                        <span className="font-medium">Username:</span> {user.username}
                    </div>
                    <div>
                        <span className="font-medium">Email:</span> {user.email}
                    </div>
                    <div>
                        <span className="font-medium">Full Name:</span> {user.full_name}
                    </div>
                    <div>
                        <span className="font-medium">Role:</span> {user.role}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeOperator;