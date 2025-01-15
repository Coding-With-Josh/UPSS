import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../api/client';

interface User {
    id: string;
    email: string;
    name: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    register: (userData: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadUser();
    }, []);

    async function loadUser() {
        try {
            await api.init();
            const userData = await api.getCurrentUser();
            setUser(userData);
        } catch (error) {
            console.error('Failed to load user:', error);
        } finally {
            setIsLoading(false);
        }
    }

    async function login(email: string, password: string) {
        const response = await api.login(email, password);
        setUser(response.user);
    }

    async function logout() {
        await api.logout();
        setUser(null);
    }

    async function register(userData: any) {
        const response = await api.register(userData);
        setUser(response.user);
    }

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
