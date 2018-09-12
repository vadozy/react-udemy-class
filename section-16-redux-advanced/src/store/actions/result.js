import * as actionTypes from "./actionTypes";

// -- -- handling async code
export const saveResult = res => {
    return {
        type: actionTypes.STORE_RESULT,
        result: res
    };
};

export const storeResult = res => {
    return (dispatch, getState) => { // avoid using 2nd parameter, but here it is
        setTimeout(() => {
            console.log(`Old counter: ${getState().ctr.counter}`);
            dispatch(saveResult(res))
        }, 2000);
    }
};
// -- -- end of handling async code

export const deleteResult = id => {
    return {
        type: actionTypes.DELETE_RESULT,
        resultId: id
    };
};
