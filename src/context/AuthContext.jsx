import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    const login = async ({ email, password }) => {
    if (password.length >= 6) {
        setUser({ email });
        return { ok: true };
    }

    return { ok: false, message: "Password must be at least 6 characters" };
};


    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
