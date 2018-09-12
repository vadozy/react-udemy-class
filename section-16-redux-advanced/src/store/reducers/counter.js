import * as ACTION_TYPE from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
	counter: 0
};

const reducer = (state = initialState, action) => {

	switch (action.type) {
		case ACTION_TYPE.INCREMENT:
			return updateObject(state, {counter: state.counter + 1});
		case ACTION_TYPE.DECREMENT:
			return updateObject(state, {counter: state.counter - 1});
		case ACTION_TYPE.ADD:
			return updateObject(state, {counter: state.counter + action.value});
		case ACTION_TYPE.SUBTRACT:
			return updateObject(state, {counter: state.counter - action.value});
		default:
			return state;
	}
};

export default reducer;
