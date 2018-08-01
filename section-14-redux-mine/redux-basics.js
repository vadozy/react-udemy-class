// import {} from ...
const redux = require('redux'); // node.js syntax
const createStore = redux.createStore; // function

const initialState = {
	counter: 0
}

// Reducer
const rootReducer = (state = initialState, action) => {
	return state; // returns updated state
};

// Store
 // Run this script as "node redux-basics.js"
const store = createStore(rootReducer);
console.log('redux store state is');
console.log(store.getState());

// Dispatching Action

// Subscription

