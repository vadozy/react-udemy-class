// import {} from ...
const redux = require('redux'); // node.js syntax
const createStore = redux.createStore; // function

const initialState = {
	counter: 0
}

// Reducer
const rootReducer = (state = initialState, action) => {
	console.log('Entered rootReducer. state = ', state, ', action = ', action);

	if (action.type === 'INC_COUNTER') {
		return {
			...state,
			counter: state.counter + 1
		}
	} 

	if (action.type === 'ADD_COUNTER') {
		return {
			...state,
			counter: state.counter + action.value
		}
	} 

	return state; // returns updated state
};

// Store
// Run this script as "node redux-basics.js"
const store = createStore(rootReducer);
console.log('redux store state is');
console.log(store.getState());

// Subscription
store.subscribe(() => {
	console.log('[Subscription]', store.getState());
});

// Dispatching Action
store.dispatch({type: 'DUMMY'});
store.dispatch({type: 'INC_COUNTER'});
store.dispatch({type: 'ADD_COUNTER', value: 10});
console.log(store.getState());
