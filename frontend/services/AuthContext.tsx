import React, { createContext, ReactNode, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode, JwtPayload } from 'jwt-decode';

type AuthContextType = {
    saveToken: (token: string) => Promise<void>;
    logout: () => Promise<void>;
    getToken: () => Promise<string | null>;
    decodeToken: () => Promise<any>;
    isLogged: () => Promise<boolean>;
    getUserId: () => Promise<string | null>;
};

const AuthContext = createContext<AuthContextType | null>(null);


export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

type AuthProviderProps = {
    children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

    const saveToken = async (token: string) => {
        await AsyncStorage.setItem('token', token);
    }

    const logout = async () => {
        await AsyncStorage.removeItem('token');
    };

    const getToken = async () => {
        return await AsyncStorage.getItem('token');
    }

    const isLogged = async () => {
        const token = await getToken();
        return !!token;
    }

    const decodeToken = async (): Promise<JwtPayload | null> => {
        const token = await getToken();
        if (!token) {
            return null;
        }
        return jwtDecode(token);
    }

    /**
     * Get the user ID from the stored JWT token.
     *
     * Returns `null` if the token is not available.
     *
     * @returns {Promise<string | null>}
     */
    const getUserId = async (): Promise<string | null> => {
        const token = await getToken();
        if (!token) {
            return null;
        }
        
        const userId = jwtDecode(token)?.sub;

        if (!userId) {
            return null;
        }

        return userId;
    }

    const value = {
        saveToken,
        logout,
        getToken,
        decodeToken,
        isLogged,
        getUserId,
    };

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>;
};

export default AuthContext;