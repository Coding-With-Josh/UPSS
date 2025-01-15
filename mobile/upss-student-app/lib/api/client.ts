import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';

// Use your computer's IP address instead of localhost
const API_URL = "http://192.168.0.158:3000/api"; // Replace X.X with your local IP

class ApiClient {
    private token: string | null = null;

    async init() {
        this.token = await SecureStore.getItemAsync('auth_token');
    }

    async setToken(token: string) {
        this.token = token;
        await SecureStore.setItemAsync('auth_token', token);
    }

    async clearToken() {
        this.token = null;
        await SecureStore.deleteItemAsync('auth_token');
    }
    private async fetch(endpoint: string, options: RequestInit = {}) {
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
            ...options.headers,
        };

        try {
            const response = await fetch(`${API_URL}${endpoint}`, {
                ...options,
                headers,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || `API error: ${response.statusText}`);
            }

            return data;
        } catch (error) {
            console.error('API Request failed:', error);
            throw error;
        }
    }

    async login(email: string, password: string) {
        const data = await this.fetch('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
        if (data.token) {
            await this.setToken(data.token);
        }
        return data;
    }

    async register(userData: any) {
        return this.fetch('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData),
        });
    }

    async logout() {
        await this.clearToken();
        return this.fetch('/api/auth/logout', { method: 'POST' });
    }

    async getCurrentUser() {
        return this.fetch('/api/user/me');
    }
}

export const api = new ApiClient();
