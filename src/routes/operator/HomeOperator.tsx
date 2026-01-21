import { useAuth } from '../../contexts/AuthContext';

function HomeOperator() {
    const { user } = useAuth();
    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="px-6 mt-[28px]">
            <div className='w-[1680px] m-auto'>
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Основные разделы</h1>
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
        </div>
    );
}

export default HomeOperator;