import { createContext, useEffect, useState } from "react";
import api from "../api/axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) setUser(JSON.parse(storedUser));
    }, [])

    const login = async (email, password) => {
        try {
            const res = await api.post("/auth/login", { emailId: email, password });
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user))
            setUser(res.data.user);
            return res.data
        }
        catch (err) {
            if (err.response?.status === 401) {
                throw new Error("Invalid email or password")
            } else if (err.response?.status === 400) {
                throw new Error(err.response.data.message);
            } else {
                throw new Error("Server error during login")
            }
        }
    };

    const register = async (name, email, password, role) => {
        console.log({ name, emailId: email, password, role });

        const res = await api.post("/auth/register", { name, emailId: email, password, role });
        localStorage.setItem("token", res.data.token)
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setUser(res.data.user);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
