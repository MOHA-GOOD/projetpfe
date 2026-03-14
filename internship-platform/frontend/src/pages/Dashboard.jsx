import useAuthStore from '../store/authStore';

const Dashboard = () => {
    const { user } = useAuthStore();

    if (!user) return <div className="p-8">Loading dashboard...</div>;

    return (
        <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
                Welcome back, {user.role === 'student' ? user.student?.first_name || user.name : user.company?.name || user.name}
            </h1>
            
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                    <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Your Dashboard</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                            {user.role === 'student' ? 'Manage your applications and profile.' : 'Manage your internship postings and applicants.'}
                        </p>
                    </div>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                    <dl className="sm:divide-y sm:divide-gray-200">
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Account Role</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 capitalize">{user.role}</dd>
                        </div>
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Email address</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.email}</dd>
                        </div>
                    </dl>
                </div>
            </div>
            
            <div className="mt-8 bg-blue-50 border-l-4 border-blue-400 p-4">
                <div className="flex">
                    <div className="ml-3">
                        <p className="text-sm text-blue-700">
                            More {user.role} features coming soon! This is just a placeholder dashboard.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
