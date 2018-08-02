const initialState = {
	counter: 0,
	results: []
};

let GLOBAL_RESULT_ID = 0;

const reducer = (state = initialState, action) => {

	switch (action.type) {
		case 'INCREMENT':
			return {
				...state,
				counter: state.counter + 1
			};
		case 'DECREMENT':
			return {
				...state,
				counter: state.counter - 1
			};
		case 'ADD':
			return {
				...state,
				counter: state.counter + action.value
			};
		case 'SUBTRACT':
			return {
				...state,
				counter: state.counter - action.value
			};
		case 'STORE_RESULT':
			return {
				...state,
				results: state.results.concat({id: ++GLOBAL_RESULT_ID, value: state.counter})
			}
		case 'DELETE_RESULT':
			const updatedArray = state.results.filter(result => result.id !== action.resultId);
			return {
				...state,
				results: updatedArray
			}
		default:
			return state;
	}
};

export default reducer;