import * as actionTypes from "./actionTypes";

export const increment = () => {
    return {
        type: actionTypes.INCREMENT
    };
};

export const decrement = () => {
    return {
        type: actionTypes.DECREMENT
    };
};

export const add = v => {
    return {
        type: actionTypes.ADD,
        value: v
    };
};

export const subtract = v => {
    return {
        type: actionTypes.SUBTRACT,
        value: v
    };
};
