import React,{createContext, useContext, useState, useEffect, useMemo, useCallback} from 'react';
import CookieManager from './cookieManager';
import {USER, TOKEN} from './storageKeys';

const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const cookieManager = CookieManager();

    const login = useCallback((user, token) => {
        cookieManager.setCookie(TOKEN, token);
        cookieManager.setCookie(USER, user);
        setUser(()=>(user));
        setToken(()=>(token));
    }, [cookieManager]);

    const logout = useCallback(() => {
        cookieManager.removeCookie(TOKEN);
        cookieManager.removeCookie(USER);
        setUser(null);
        setToken(null);
    }, [cookieManager]);

    useEffect(() => {
        const savedToken = cookieManager.getCookie(TOKEN);
        const savedUser = cookieManager.getCookie(USER);
        if (savedToken && savedUser) {
            setToken(()=>(savedToken));
            setUser(()=>(savedUser));
        }
        // this useEffect will only run once
        // eslint-disable-next-line 
    }, []);


     const contextValue = useMemo(() => ({
        user,
        token,
        login,
        logout,
    }), [user, token, login, logout]);

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);
