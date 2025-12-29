import { createContext, useEffect, useState } from "react";
import api from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const checkAuth = async () => {
        try {
            const res = await api.get("/admin/check-auth");
            setUser(res.data.user);
        } catch (error) {
            setUser(null);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
};
