import * as actionTypes from './actionTypes';
import axios from 'axios';
import { config } from '../../secret';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (idToken, localId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: idToken,
        userId: localId
    };
};

export const authFail = err => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: err.response.data.error.message
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        // Sign Up URL
        // see https://firebase.google.com/docs/reference/rest/auth for docs
        let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${config.apiKey}`;
        if (!isSignup) {
            // Sign in URL
            url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${config.apiKey}`;
        }
        axios.post(url, authData)
            .then(response => {
                console.log(response);
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err => {
                console.error(`auth action Error: ${err}`);
                dispatch(authFail(err));
            });
    };
};

export const setAuthRedirectPath = path => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        const expirationDate = new Date(localStorage.getItem('expirationDate'));
        if (!token) {
            dispatch(logout());
        } else if (expirationDate > new Date()) {
            dispatch(authSuccess(localStorage.getItem('token'), localStorage.getItem('userId')));
            dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
        } else {
            dispatch(logout());
        }
    };
};
