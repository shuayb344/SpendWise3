import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('spendwise_user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const login = (email, password) => {
        // Mock authentication
        const mockUser = { id: '1', email, name: email.split('@')[0] };
        setUser(mockUser);
        localStorage.setItem('spendwise_user', JSON.stringify(mockUser));
    };

    const signup = (name, email, password) => {
        // Mock signup
        const mockUser = { id: Date.now().toString(), email, name };
        setUser(mockUser);
        localStorage.setItem('spendwise_user', JSON.stringify(mockUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('spendwise_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
