import React, {createContext, ReactNode, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextType = {
    saveToken: (token: string) => Promise<void>;
    logout: () => Promise<void>;
    getToken: () => Promise<string|null>;
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

    const value = {
        saveToken,
        logout,
        getToken
    };

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>;
};

export default AuthContext;