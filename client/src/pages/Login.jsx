import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const { checkAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        setIsLoading(true);
        setErr("");

        try {
            await api.post("/auth/login", { email, password });
            await checkAuth();
            navigate("/dashboard");
        } catch (error) {
            setErr(error.response?.data?.message || "Invalid credentials");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md animate-[fadeIn_0.6s_ease-out]">
                <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6 border border-slate-100">

                    {/* Header */}
                    <div className="text-center space-y-2">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-full mb-4">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-slate-800">Admin Login</h2>
                        <p className="text-slate-500 text-sm">Sign in to continue</p>
                    </div>

                    {/* Inputs */}
                    <div className="space-y-4">
                        <input
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-50 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                            className="w-full px-4 py-3 bg-slate-50 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Error */}
                    {err && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded text-sm">
                            {err}
                        </div>
                    )}

                    {/* Button */}
                    <button
                        onClick={handleSubmit}
                        disabled={isLoading || !email || !password}
                        className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
                    >
                        {isLoading ? "Signing in..." : "Sign In"}
                    </button>

                    {/* Footer */}
                    <div className="text-center pt-4 border-t">
                        <button
                            onClick={() => navigate("/register")}
                            className="text-indigo-600 font-semibold hover:underline"
                        >
                            Don’t have an account? Create one
                        </button>
                    </div>

                </div>
            </div>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}
