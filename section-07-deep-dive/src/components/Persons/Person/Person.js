import React, { Component } from 'react';

import classes from './Person.css'; // classes was added after ejecting and tweaking config
//import WithClass from '../../../hoc/WithClass';
import Aux from '../../../hoc/Aux';
import withClass from '../../../hoc/withClass_v2';

class Person extends Component {

    constructor(props) {
        super(props);
        console.log('[Person.js] Inside constructor(%o)', props);
    }

    componentWillMount() {
        console.log('[Person.js] Inside componentWillMount()');
    }

    componentDidMount() {
        console.log('[Person.js] Inside componentDidMount()');
    }

    componentWillUnmount() {
        console.log('[Person.js] Inside componentWillUnmount()');
    }

    componentWillReceiveProps(nextProps) {
        console.log('[UPDATE Person.js] Inside componentWillReceiveProps(%o)', nextProps)
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('[UPDATE Person.js] Inside shouldComponentUpdate(%o, %o)', nextProps, nextState)
        return nextProps.name !== this.props.name;
    }

    componentWillUpdate(nextProps, nextState) {
        console.log('[UPDATE Person.js] Inside componentWillUpdate(%o, %o)', nextProps, nextState)
    }

    componentDidUpdate() {
        console.log('[UPDATE Person.js] Inside componentDidUpdate()');
    }

    render() {
        console.log('[Person.js] Inside render()');
        return (
            //<WithClass classes={classes.Person} >
            <Aux>
                <p onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old!</p>
                <p>{this.props.children}</p>
                <input type="text" onChange={this.props.changed} value={this.props.name} />
            </Aux>
            //</WithClass>
        )
    }

}

export default withClass(Person, classes.Person);