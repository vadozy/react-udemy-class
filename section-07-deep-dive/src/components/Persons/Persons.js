import React, { PureComponent } from 'react';
import Person from './Person/Person';

class Persons extends PureComponent {

    constructor(props) {
        super(props);
        console.log('[Persons.js] Inside constructor(%o)', props);
        this.myLastPersonRef = React.createRef();
    }

    componentWillMount() {
        console.log('[Persons.js] Inside componentWillMount()');
    }

    componentDidMount() {
        console.log('[Persons.js] Inside componentDidMount()');
        this.myLastPersonRef.current.focus();
    }

    componentWillUnmount() {
        console.log('[Persons.js] Inside componentWillUnmount()');
    }

    componentWillReceiveProps(nextProps) {
        console.log('[UPDATE Persons.js] Inside componentWillReceiveProps(%o)', nextProps);
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log('[UPDATE Persons.js] Inside shouldComponentUpdate(%o, %o)', nextProps, nextState);
    //     return nextProps.persons !== this.props.persons;
    //     //return true;
    // }

    componentWillUpdate(nextProps, nextState) {
        console.log('[UPDATE Persons.js] Inside componentWillUpdate(%o, %o)', nextProps, nextState);
    }

    componentDidUpdate() {
        console.log('[UPDATE Persons.js] Inside componentDidUpdate()');
    }

    render() {
        console.log('[Persons.js] Inside render()');
        return this.props.persons.map((p, index) => {
            return <Person
              click={() => this.props.personClicked(index)} // deletePersonHandler
              changed={event => this.props.personChanged(event.target.value, p.id)} // nameChangedHandler
              name={p.name}
              age={p.age} 
              position={index}
              ref={this.myLastPersonRef}
              key={p.id} />
        });
    }

}

export default Persons;