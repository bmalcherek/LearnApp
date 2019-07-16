/* eslint-disable arrow-body-style */
import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    };
};

export const authSuccess = (token) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token,
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error,
    };
};

export const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.AUTH_LOGOUT,
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const authLogin = (username, password) => {
    return (dispatch) => {
        dispatch(authStart());
        axios.post('http://localhost:8000/rest-auth/login/', {
            username,
            password,
        })
            .then((res) => {
                const token = res.data.key;
                const currDate = new Date();
                // 3600000 = 3600 * 1000 seconds = 1 hour
                const expirationDate = new Date(currDate.getTime() + 3600000);
                localStorage.setItem('token', token);
                localStorage.setItem('expirationDate', expirationDate);
                dispatch(authSuccess(token));
                dispatch(checkAuthTimeout(3600));
            })
            .catch((error) => {
                dispatch(authFail(error));
            });
    };
};

export const authSignup = (username, email, password1, password2) => {
    return (dispatch) => {
        dispatch(authStart());
        axios.post('http://localhost:8000/rest-auth/registration/', {
            username,
            email,
            password1,
            password2,
        })
            .then((res) => {
                const token = res.data.key;
                const currDate = new Date();
                // 3600000 = 3600 * 1000 seconds = 1 hour
                const expirationDate = new Date(currDate.getTime() + 3600000);
                localStorage.setItem('token', token);
                localStorage.setItem('expirationDate', expirationDate);
                dispatch(authSuccess(token));
                dispatch(checkAuthTimeout(3600));
            })
            .catch((error) => {
                dispatch(authFail(error));
            });
    };
};

export const authCheckState = () => {
    return (dispatch) => {
        const token = localStorage.getItem('token');
        if (token === undefined) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                dispatch(authSuccess());
                const currentDate = new Date();
                dispatch(checkAuthTimeout((expirationDate.getTime() - currentDate.getTime()) / 1000));
            }
        }
    };
};
