import * as ACTION_TYPE from '../actions';

const initialState = {
	results: []
};

let GLOBAL_RESULT_ID = 0;

const reducer = (state = initialState, action) => {

	switch (action.type) {
		case ACTION_TYPE.STORE_RESULT:
			return {
				...state,
				results: state.results.concat({id: ++GLOBAL_RESULT_ID, value: action.result})
			};
		case ACTION_TYPE.DELETE_RESULT:
			const updatedArray = state.results.filter(result => result.id !== action.resultId);
			return {
				...state,
				results: updatedArray
			};
		default:
			return state;
	}

};

export default reducer;