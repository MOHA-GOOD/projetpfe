import { useState, useEffect } from 'react';
import api from '../lib/axios';

const Internships = () => {
    const [internships, setInternships] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInternships = async () => {
            try {
                const response = await api.get('/internships');
                setInternships(response.data.data || []);
            } catch (error) {
                console.error("Failed to fetch internships", error);
            } finally {
                setLoading(false);
            }
        };

        fetchInternships();
    }, []);

    if (loading) return <div className="p-8 text-center mt-10">Loading available internships...</div>;

    return (
        <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Browse Internships</h1>
            
            {internships.length === 0 ? (
                <div className="text-center bg-white p-10 rounded-lg shadow">
                    <h3 className="text-lg font-medium text-gray-900">No internships found</h3>
                    <p className="mt-2 text-sm text-gray-500">Companies haven't posted any internships yet. Check back later!</p>
                </div>
            ) : (
                <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
                    {internships.map(internship => (
                        <div key={internship.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col h-full hover:shadow-md transition-shadow">
                            <div className="flex-1">
                                <h3 className="text-xl font-semibold text-gray-900">{internship.title}</h3>
                                <p className="text-sm text-blue-600 font-medium mt-1">{internship.company?.name || 'Company Name'}</p>
                                
                                <div className="mt-4 flex flex-wrap gap-2">
                                    <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                                        {internship.work_type}
                                    </span>
                                    <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                                        {internship.location || 'Anywhere'}
                                    </span>
                                    <span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700">
                                        {internship.duration} months
                                    </span>
                                </div>
                                <p className="mt-4 text-sm text-gray-600 line-clamp-3">
                                    {internship.description}
                                </p>
                            </div>
                            <div className="mt-6 pt-6 border-t border-gray-100">
                                <button className="w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-blue-600 shadow-sm ring-1 ring-inset ring-blue-300 hover:bg-gray-50">
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Internships;
