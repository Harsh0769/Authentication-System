import { useEffect, useState } from "react";
import api from "../api/axios";

const Dashboard = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const res = await api.get("/students"); // Ensure backend returns array
                setStudents(res.data); // If your backend sends { students: [...] }, use res.data.students
            } catch (err) {
                console.error("Error fetching students:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchStudents();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900">
                <p className="text-white text-xl">Loading students...</p>
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-900 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-white text-center">
                Student Dashboard
            </h1>

            {students.length === 0 ? (
                <p className="text-white text-center">No students found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {students.map((student) => (
                        <div
                            key={student._id}
                            className="bg-black text-white border border-gray-700 p-5 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                        >
                            <h2 className="font-bold text-xl mb-2">{student.name}</h2>
                            <p className="text-sm mb-1">
                                <span className="font-semibold">Email:</span> {student.emailId}
                            </p>
                            {student.role && (
                                <p className="text-sm mb-1">
                                    <span className="font-semibold">Role:</span> {student.role}
                                </p>
                            )}
                            {student.gender && (
                                <p className="text-sm">
                                    <span className="font-semibold">Gender:</span> {student.gender}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;