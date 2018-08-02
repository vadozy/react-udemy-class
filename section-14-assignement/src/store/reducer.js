import * as ACTION_TYPE from './actions';

const initialState = {
	persons: []
};

const reducer = (state = initialState, action) => {

	switch (action.type) {
		case ACTION_TYPE.ADD:
			return personAddedHandler(state);
		case ACTION_TYPE.REMOVE:
			return personDeletedHandler(state, action.personId);
		default:
			return state;
	}

};

const personAddedHandler = (state) => {
    const newPerson = {
        id: Math.random(), // not really unique but good enough here!
        name: 'Max',
        age: Math.floor( Math.random() * 40 )
    }

    return { persons: state.persons.concat(newPerson)};
};

const personDeletedHandler = (state, personId) => {
	return { persons: state.persons.filter(person => person.id !== personId)};
};

export default reducer;