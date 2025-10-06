import { useState, useContext } from "react";
import { AuthContext } from '../context/authContext';
import { useNavigate } from "react-router-dom";


const Register = () => {

    const { register } = useContext(AuthContext);
    const [form, setForm] = useState({ name: "", email: "", password: "", role: "" })
    const navigate = useNavigate();


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, email, password, role } = form;
        await register(name, email, password, role);
        alert("Registration Successfully ! Now Login")
        navigate("/")

    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <form
                onSubmit={handleSubmit}
                className="w-80 bg-black p-6 rounded shadow-md"
            >
                <h2 className="text-xl font-bold mb-4">Register</h2>
                <input
                    name="name"
                    type="text"
                    placeholder="Name"
                    onChange={handleChange}
                    className="w-full border border-gray-500 p-2 mb-2 rounded"
                />
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    onChange={handleChange}
                    className="w-full border border-gray-500 p-2 mb-2 rounded "
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                    className="w-full border border-gray-500 p-2 mb-2 rounded"
                />
                <input
                    name="role"
                    type="text"
                    placeholder="role"
                    onChange={handleChange}
                    className="w-full border border-gray-500 p-2 mb-2 rounded"
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded w-full"
                >
                    Register
                </button>
            </form>
        </div>
    )
}

export default Register
