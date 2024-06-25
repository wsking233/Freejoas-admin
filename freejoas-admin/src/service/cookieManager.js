import Cookies from 'js-cookie';

function CookieManager() {
    const setCookie = (name, value) => {
        // check if the value is an object
        if (typeof value === 'object') {
            value = JSON.stringify(value);
        }
        Cookies.set(name, value);
    };

    const getCookie = (name) => {
        // if the value is an object parse it, else return the value
        const value = Cookies.get(name);
        try {
            return JSON.parse(value);
        } catch (err) {
            return value;
        }
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