import * as ACTION_TYPE from '../actions';

const initialState = {
	counter: 0
};

const reducer = (state = initialState, action) => {

	switch (action.type) {
		case ACTION_TYPE.INCREMENT:
			return {
				...state,
				counter: state.counter + 1
			};
		case ACTION_TYPE.DECREMENT:
			return {
				...state,
				counter: state.counter - 1
			};
		case ACTION_TYPE.ADD:
			return {
				...state,
				counter: state.counter + action.value
			};
		case ACTION_TYPE.SUBTRACT:
			return {
				...state,
				counter: state.counter - action.value
			};
		default:
			return state;
	}
};

export default reducer;