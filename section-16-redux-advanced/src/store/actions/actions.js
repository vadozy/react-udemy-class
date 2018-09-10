export const INCREMENT     = 'INCREMENT';
export const DECREMENT     = 'DECREMENT';
export const ADD           = 'ADD';
export const SUBTRACT      = 'SUBTRACT';
export const STORE_RESULT  = 'STORE_RESULT';
export const DELETE_RESULT = 'DELETE_RESULT';

export const increment = () => {
    return {
        type: INCREMENT
    };
};

export const decrement = () => {
    return {
        type: DECREMENT
    };
};

export const add = v => {
    return {
        type: ADD,
        value: v
    };
};

export const subtract = v => {
    return {
        type: SUBTRACT,
        value: v
    };
};

// -- -- handling async code
export const saveResult = res => {
    return {
        type: STORE_RESULT,
        result: res
    };
};

export const storeResult = result => {
    return dispatch => {
        setTimeout(() => {
            dispatch(saveResult(result))
        }, 2000);
    }
};
// -- -- end of handling async code

export const deleteResult = id => {
    return {
        type: DELETE_RESULT,
        resultId: id
    };
};
