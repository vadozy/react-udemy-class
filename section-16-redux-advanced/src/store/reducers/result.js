import * as ACTION_TYPE from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
	results: []
};

let GLOBAL_RESULT_ID = 0;

const deleteResult = (state, action) => {
	const updatedArray = state.results.filter(result => result.id !== action.resultId);
	return updateObject(state, {results: updatedArray});
}

const reducer = (state = initialState, action) => {

	switch (action.type) {
		case ACTION_TYPE.STORE_RESULT:
			return updateObject(state, {results: state.results.concat({id: ++GLOBAL_RESULT_ID, value: action.result * 2})});
		case ACTION_TYPE.DELETE_RESULT:
			return deleteResult(state, action);
		default:
			return state;
	}

};

export default reducer;
