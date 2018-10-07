import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        });
    });

    it('should store the token upon login', () => {
        expect(reducer({
            token: null,
            userId: null,
            error: "some error",
            loading: true,
            authRedirectPath: '/whatever'
        }, {
            type: actionTypes.AUTH_SUCCESS,
            token: "some-token",
            userId: "test-user",
            error: null,
            loading: false
        })).toEqual({
            token: "some-token",
            userId: "test-user",
            error: null,
            loading: false,
            authRedirectPath: '/whatever'
        });
    });
    
});
