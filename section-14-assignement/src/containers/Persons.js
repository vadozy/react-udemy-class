import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ACTION_TYPE from '../store/actions';

import Person from '../components/Person/Person';
import AddPerson from '../components/AddPerson/AddPerson';

class Persons extends Component {

    render () {
        return (
            <div>
                <AddPerson personAdded={this.props.personAddedHandler} />
                {this.props.prs.map(person => (
                    <Person 
                        key={person.id}
                        name={person.name} 
                        age={person.age} 
                        clicked={() => this.props.personDeletedHandler(person.id)}/>
                ))}
            </div>
        );
    }
}

// Redux configuration for the given container
// parameter "state" is the one managed by redux (see reducer.js)
const mapStateToProps = state => {
    return {
        prs: state.persons
    };
};

const mapDispatchToProps = dispatch => {
    return {
        personAddedHandler:   (name, age) => dispatch({type: ACTION_TYPE.ADD, name: name, age: age}),
        personDeletedHandler: id => dispatch({type: ACTION_TYPE.REMOVE, personId: id})
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Persons);
