import React  from "react";
import Cookies from 'js-cookie';

function CookieManager() {
    const setCookie = (name, value) => {
        Cookies.set(name, value);
    };

    const getCookie = (name) => {
        return Cookies.get(name);
    };

    const removeCookie = (name) => {
        Cookies.remove(name);
    };

    return {
        setCookie,
        getCookie,
        removeCookie
    };
}

export default CookieManager;