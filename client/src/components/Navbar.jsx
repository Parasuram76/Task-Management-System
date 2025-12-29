import { useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = async () => {
        try {
            await api.get("/admin/logout");
            setUser(null);
            navigate("/");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <nav className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-lg flex items-center justify-center transform transition-transform duration-300 hover:scale-110 hover:rotate-6">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                            Task Manager
                        </h3>
                    </div>

                    {/* User Menu */}
                    {user && (
                        <div className="flex items-center gap-4">
                            <div className="hidden sm:block text-right">
                                <p className="text-sm font-medium text-slate-800">{user.name}</p>
                                <p className="text-xs text-slate-500">{user.email}</p>
                            </div>
                            <button
                                onClick={logout}
                                className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                <span className="hidden sm:inline">Logout</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}