import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './Person.css'; // classes was added after ejecting and tweaking config
//import WithClass from '../../../hoc/WithClass';
import Aux from '../../../hoc/Aux';
import withClass from '../../../hoc/withClass_v2';

import { MyAuthContext } from '../../../containers/App';

class Person extends Component {

    constructor(props) {
        super(props);
        console.log('[Person.js] Inside constructor(%o)', props);
        this.myInputElement = React.createRef();
    }

    // discouraged as of React 16.3
    componentWillMount() {
        console.log('[Person.js] Inside componentWillMount()');
    }

    componentDidMount() {
        console.log('[Person.js] Inside componentDidMount()');
        if (this.props.position === 0) {
            this.myInputElement.current.focus();
        }
    }

    componentWillUnmount() {
        console.log('[Person.js] Inside componentWillUnmount()');
    }

    // discouraged as of React 16.3
    componentWillReceiveProps(nextProps) {
        console.log('[UPDATE Person.js] Inside componentWillReceiveProps(%o)', nextProps)
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('[UPDATE Person.js] Inside shouldComponentUpdate(%o, %o)', nextProps, nextState)
        return nextProps.name !== this.props.name ||
            nextProps.authenticated !== this.props.authenticated;
    }

    // discouraged as of React 16.3
    componentWillUpdate(nextProps, nextState) {
        console.log('[UPDATE Person.js] Inside componentWillUpdate(%o, %o)', nextProps, nextState)
    }

    componentDidUpdate() {
        console.log('[UPDATE Person.js] Inside componentDidUpdate()');
    }

    focus() {
        this.myInputElement.current.focus();
    }

    render() {
        console.log('[Person.js] Inside render()');
        return (
            //<WithClass classes={classes.Person} >
            <Aux>
                <MyAuthContext.Consumer>
                {auth => auth ? <p>I'm authenticated</p> : null}
                </MyAuthContext.Consumer>
                <p onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old!</p>
                <p>{this.props.children}</p>
                <input
                    ref={this.myInputElement}
                    type="text"
                    onChange={this.props.changed}
                    value={this.props.name} />
            </Aux>
            //</WithClass>
        )
    }

}

Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func
};

export default withClass(Person, classes.Person);