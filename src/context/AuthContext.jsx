import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('spendwise_session');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [users, setUsers] = useState(() => {
        const savedUsers = localStorage.getItem('spendwise_registered_users');
        return savedUsers ? JSON.parse(savedUsers) : [];
    });

    useEffect(() => {
        localStorage.setItem('spendwise_registered_users', JSON.stringify(users));
    }, [users]);

    const login = (email, password) => {
        const existingUser = users.find(u => u.email === email && u.password === password);
        if (existingUser) {
            const sessionUser = { id: existingUser.id, email: existingUser.email, name: existingUser.name };
            setUser(sessionUser);
            localStorage.setItem('spendwise_session', JSON.stringify(sessionUser));
            return { success: true };
        }
        return { success: false, message: 'Invalid email or password' };
    };

    const signup = (name, email, password) => {
        if (users.find(u => u.email === email)) {
            return { success: false, message: 'User already exists' };
        }
        const newUser = { id: Date.now().toString(), name, email, password };
        const updatedUsers = [...users, newUser];
        setUsers(updatedUsers);

        const sessionUser = { id: newUser.id, email: newUser.email, name: newUser.name };
        setUser(sessionUser);
        localStorage.setItem('spendwise_session', JSON.stringify(sessionUser));
        return { success: true };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('spendwise_session');
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
