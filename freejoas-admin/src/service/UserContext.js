import React,{createContext, useContext, useState, useEffect, useMemo} from 'react';
import CookieManager from './cookieManager';
import {USER, TOKEN} from './storageKeys';

const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const cookieManager = CookieManager();

    const login = (user, token) => {
        cookieManager.setCookie(TOKEN, token);
        cookieManager.setCookie(USER, user);
        setUser(()=>(user));
        setToken(()=>(token));
    }

    const logout = () => {
        cookieManager.removeCookie(TOKEN);
        cookieManager.removeCookie(USER);
        setUser(null);
        setToken(null);
    }

    useEffect(() => {
        const savedToken = cookieManager.getCookie(TOKEN);
        const savedUser = cookieManager.getCookie(USER);
        if (savedToken && savedUser) {
            setToken(()=>(savedToken));
            setUser(()=>(savedUser));
        }
    }, []);


    return useMemo(() => (
        <UserContext.Provider value={{user, token, setUser, login, logout}}>
            {children}
        </UserContext.Provider>
    ), [user, token, setUser, login, logout]);
}

export const useUser = () => useContext(UserContext);
