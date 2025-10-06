import { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {

        e.preventDefault();
        try {
            await login(form.email, form.password);
            navigate("/dashboard");
        }
        catch (err) {
            alert(err.response?.data?.message || "Login failed")
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <form
                onSubmit={handleSubmit}
                className="w-80 bg-black p-6 rounded shadow-md"
            >
                <h2 className="text-xl font-bold mb-4">Login</h2>
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    onChange={handleChange}
                    className="w-full border p-2 mb-2"
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                    className="w-full border p-2 mb-4"
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded w-full"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;