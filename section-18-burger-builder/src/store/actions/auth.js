import * as actionTypes from './actionTypes';
import axios from 'axios';
import { config } from '../../secret';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = authData => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: authData.idToken,
        userId: authData.localId
    };
};

export const authFail = err => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: err.response.data.error.message
    };
};

export const logout = () => {
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
                dispatch(authSuccess(response.data));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err => {
                console.error(`auth action Error: ${err}`);
                dispatch(authFail(err));
            });
    };
};
