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
        authData: authData
    };
};

export const authFail = err => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: err
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
            })
            .catch(err => {
                console.error(err);
                dispatch(authFail(err));
            });
    };
};
