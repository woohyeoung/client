import { Cookies } from 'react-cookie';

const cookie = new Cookies();
export const baseUrl = process.env.REACT_APP_BASE_URL;
export const reqAccess = process.env.REACT_APP_ACCESS_REQ;
export const resAccess = process.env.REACT_APP_ACCESS_RES;
export const reqRefresh = process.env.REACT_APP_REFRESH_REQ;
export const resRefresh = process.env.REACT_APP_REFRESH_RES;
export const urlRefresh = process.env.REACT_APP_REFRESH_URL;
export const getToken = (key) => {
    switch (key) {
        case 'access':
            return cookie.get(reqAccess);
        case 'refresh':
            return cookie.get(reqRefresh);
        default:
            return;
    }
};
export const saveToken = (key, value) => {
    let tokenKey = '',
        tokenValue = '';
    switch (key) {
        case 'access':
            tokenKey = reqAccess;
            tokenValue = value.substring(7);
            break;
        case 'refresh':
            tokenKey = reqRefresh;
            tokenValue = value;
            break;
        default:
            break;
    }
    cookie.set(tokenKey, tokenValue, {
        secure: true,
        path: '/'
    });
    return;
};
export const removeToken = (key) => {
    switch (key) {
        case 'access':
            cookie.remove(reqAccess, {
                path: '/',
                secure: true
            });
            return;
        case 'refresh':
            cookie.remove(reqRefresh, {
                path: '/',
                secure: true
            });
            return;
        case 'two':
            cookie.remove(reqAccess, {
                path: '/',
                secure: true
            });
            cookie.remove(reqRefresh, {
                path: '/',
                secure: true
            });
            return;
        default:
            return;
    }
};
export const sendToken = (key) => {
    switch (key) {
        case 'access':
            return `Bearer ${cookie.get(reqAccess)}`;
        case 'refresh':
            return cookie.get(reqRefresh);
        default:
            return;
    }
};
