import * as ACTION_TYPE from './actions';

const initialState = {
	persons: []
};

const reducer = (state = initialState, action) => {

	switch (action.type) {
		case ACTION_TYPE.ADD:
			return personAddedHandler(state, action.name, action.age);
		case ACTION_TYPE.REMOVE:
			return personDeletedHandler(state, action.personId);
		default:
			return state;
	}

};

const personAddedHandler = (state, name = "Max", age = 0) => {
	console.log("personAddedHandler", name, age);
    const newPerson = {
        id: Math.random(), // not really unique but good enough here!
        name: name,
        age: age
    }

    return {
    	...state,
    	persons: state.persons.concat(newPerson)
    };

};

const personDeletedHandler = (state, personId) => {
	return {
		...state,
		persons: state.persons.filter(person => person.id !== personId)
	};
};

export default reducer;