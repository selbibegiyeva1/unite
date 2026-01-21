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
                    {/* main sections content goes here */}
                </div>
            </div>
        </div>
    );
}

export default HomeOperator;